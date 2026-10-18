/**
 * Pengelola audio untuk Gemini Live.
 * Masukan: PCM 16-bit little-endian 16 kHz dari mikrofon (diturunkan dari laju asli perangkat).
 * Keluaran: PCM 16-bit 24 kHz dari model, diputar berurutan tanpa jeda.
 * Pola dasar diadaptasi dari Learning Simulator BBLC.
 */
export class AudioStreamManager {
  private inputCtx: AudioContext | null = null;
  private outputCtx: AudioContext | null = null;
  private mediaStream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private muteGain: GainNode | null = null;

  private nextPlayTime = 0;
  private activeSources: AudioBufferSourceNode[] = [];
  public isRecording = false;

  async startRecording(onChunk: (base64PCM: string) => void, onVolume?: (volume: number) => void): Promise<void> {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      this.inputCtx = new AC();
      if (this.inputCtx.state === 'suspended') await this.inputCtx.resume();
      const ratio = this.inputCtx.sampleRate / 16000;

      this.source = this.inputCtx.createMediaStreamSource(this.mediaStream);
      this.processor = this.inputCtx.createScriptProcessor(4096, 1, 1);
      // keluaran prosesor dibisukan agar suara mikrofon tidak terdengar kembali di speaker
      this.muteGain = this.inputCtx.createGain();
      this.muteGain.gain.value = 0;

      this.processor.onaudioprocess = (e) => {
        if (!this.isRecording) return;
        const input = e.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < input.length; i++) sum += input[i] * input[i];
        onVolume?.(Math.min(1, Math.sqrt(sum / input.length) * 5));
        onChunk(this.toPcm16Base64(this.downsample(input, ratio)));
      };

      this.source.connect(this.processor);
      this.processor.connect(this.muteGain);
      this.muteGain.connect(this.inputCtx.destination);
      this.isRecording = true;
    } catch (err) {
      this.stopRecording();
      throw err;
    }
  }

  stopRecording(): void {
    this.isRecording = false;
    try {
      this.processor?.disconnect();
      this.source?.disconnect();
      this.muteGain?.disconnect();
    } catch {
      // abaikan
    }
    this.processor = null;
    this.source = null;
    this.muteGain = null;
    this.mediaStream?.getTracks().forEach((t) => t.stop());
    this.mediaStream = null;
    if (this.inputCtx && this.inputCtx.state !== 'closed') {
      this.inputCtx.close().catch(() => {});
    }
    this.inputCtx = null;
  }

  // Dipanggil dari klik pengguna agar peramban mengizinkan pemutaran suara
  async prime(): Promise<void> {
    try {
      if (!this.outputCtx || this.outputCtx.state === 'closed') {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        this.outputCtx = new AC({ sampleRate: 24000 });
      }
      if (this.outputCtx.state === 'suspended') await this.outputCtx.resume();
    } catch {
      // abaikan
    }
  }

  async playAudioChunk(base64Audio: string, onVolume?: (v: number) => void, onEnded?: () => void): Promise<void> {
    try {
      if (!this.outputCtx || this.outputCtx.state === 'closed') {
        const AC = window.AudioContext || (window as any).webkitAudioContext;
        this.outputCtx = new AC({ sampleRate: 24000 });
      }
      if (this.outputCtx.state === 'suspended') await this.outputCtx.resume();

      const bin = window.atob(base64Audio);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const int16 = new Int16Array(bytes.buffer, 0, Math.floor(bytes.length / 2));
      const f32 = new Float32Array(int16.length);
      let sum = 0;
      for (let i = 0; i < int16.length; i++) {
        const v = int16[i] / 32768;
        f32[i] = v;
        sum += v * v;
      }
      onVolume?.(Math.min(1, Math.sqrt(sum / Math.max(1, int16.length)) * 4));

      const buf = this.outputCtx.createBuffer(1, f32.length, 24000);
      buf.getChannelData(0).set(f32);
      const node = this.outputCtx.createBufferSource();
      node.buffer = buf;
      node.connect(this.outputCtx.destination);
      const startAt = Math.max(this.outputCtx.currentTime, this.nextPlayTime);
      node.start(startAt);
      this.nextPlayTime = startAt + buf.duration;
      this.activeSources.push(node);
      node.onended = () => {
        const i = this.activeSources.indexOf(node);
        if (i !== -1) this.activeSources.splice(i, 1);
        if (this.activeSources.length === 0) {
          onVolume?.(0);
          onEnded?.();
        }
      };
    } catch (err) {
      console.warn('Gagal memutar potongan audio:', err);
    }
  }

  interruptPlayback(): void {
    for (const s of this.activeSources) {
      try {
        s.onended = null;
        s.stop();
        s.disconnect();
      } catch {
        // abaikan
      }
    }
    this.activeSources = [];
    if (this.outputCtx) this.nextPlayTime = this.outputCtx.currentTime;
  }

  cleanup(): void {
    this.stopRecording();
    this.interruptPlayback();
    if (this.outputCtx && this.outputCtx.state !== 'closed') this.outputCtx.close().catch(() => {});
    this.outputCtx = null;
  }

  private downsample(input: Float32Array, ratio: number): Float32Array {
    if (ratio <= 1.001) return input;
    const outLen = Math.floor(input.length / ratio);
    const out = new Float32Array(outLen);
    for (let i = 0; i < outLen; i++) {
      const start = Math.floor(i * ratio);
      const end = Math.min(input.length, Math.floor((i + 1) * ratio));
      let acc = 0;
      for (let j = start; j < end; j++) acc += input[j];
      out[i] = acc / Math.max(1, end - start);
    }
    return out;
  }

  private toPcm16Base64(input: Float32Array): string {
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);
    for (let i = 0, o = 0; i < input.length; i++, o += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 8192) {
      binary += String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + 8192)));
    }
    return window.btoa(binary);
  }
}
