import { jsPDF } from 'jspdf';
import { AssessmentResult } from '../types';

export function generateCompetencyCertificatePDF(
  result: AssessmentResult,
  candidateName: string = 'Peserta Simulasi'
) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 297 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 210 mm

  // Background subtle tint
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Outer Border
  doc.setDrawColor(203, 213, 225); // Slate 300
  doc.setLineWidth(1.5);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

  // Inner Accent Border
  doc.setDrawColor(217, 119, 6); // Amber 600
  doc.setLineWidth(0.8);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

  // Decorative Corner Dots
  doc.setFillColor(217, 119, 6);
  doc.circle(12, 12, 2.5, 'F');
  doc.circle(pageWidth - 12, 12, 2.5, 'F');
  doc.circle(12, pageHeight - 12, 2.5, 'F');
  doc.circle(pageWidth - 12, pageHeight - 12, 2.5, 'F');

  // Top Header / Badge
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(180, 83, 9); // Amber 700
  doc.text('Vokasta • MULTIMODAL WORKFORCE COMPETENCY PLATFORM', pageWidth / 2, 24, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Standar Kredensial 1EdTech Open Badges v3.0 & W3C Verifiable Credentials (Format Simulasi)', pageWidth / 2, 29, { align: 'center' });

  // Main Certificate Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42); // Slate 900
  doc.text('SERTIFIKAT KOMPETENSI KERJA MANDIRI', pageWidth / 2, 42, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105); // Slate 600
  doc.text('Diberikan sebagai contoh simulasi berdasarkan evaluasi atas rekaman latihan kepada:', pageWidth / 2, 48, { align: 'center' });

  // Recipient Candidate Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(180, 83, 9); // Amber 700
  doc.text(candidateName, pageWidth / 2, 60, { align: 'center' });

  // Underline under recipient name
  doc.setDrawColor(245, 158, 11);
  doc.setLineWidth(0.6);
  const textW = doc.getTextWidth(candidateName);
  doc.line(pageWidth / 2 - textW / 2 - 10, 63, pageWidth / 2 + textW / 2 + 10, 63);

  // Narrative
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  const scenarioTitle = result.scenario_title || 'SOP Layanan Frontline';
  doc.text(
    `Telah menyelesaikan simulasi operasional roleplay dan memenuhi seluruh parameter pengujian pada:`,
    pageWidth / 2,
    71,
    { align: 'center' }
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(`"${scenarioTitle}"`, pageWidth / 2, 78, { align: 'center' });

  // Competency Table Box
  const tableY = 86;
  const tableX = 24;
  const tableWidth = pageWidth - 48;
  const colW1 = 160;
  const colW2 = 45;
  const colW3 = tableWidth - colW1 - colW2;

  // Header Row
  doc.setFillColor(241, 245, 249);
  doc.rect(tableX, tableY, tableWidth, 8, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(tableX, tableY, tableWidth, 8, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text('PARAMETER KOMPETENSI TERUJI', tableX + 4, tableY + 5.5);
  doc.text('KATEGORI KREDENSIAL', tableX + colW1 + 4, tableY + 5.5);
  doc.text('SKOR & STATUS', tableX + colW1 + colW2 + 4, tableY + 5.5);

  let curY = tableY + 8;
  const rowH = 7.5;
  const params = result.parameter_scores || [];

  params.forEach((param, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(tableX, curY, tableWidth, rowH, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.rect(tableX, curY, tableWidth, rowH, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);

    // Truncate name if too long
    let pName = param.parameter_name;
    if (doc.getTextWidth(pName) > colW1 - 8) {
      pName = pName.substring(0, 55) + '...';
    }
    doc.text(`• ${pName}`, tableX + 4, curY + 5);

    const categoryText = param.is_universal ? 'Universal (Milik Pekerja)' : 'Khusus Merek (Internal)';
    doc.setFont('helvetica', param.is_universal ? 'bold' : 'normal');
    if (param.is_universal) {
      doc.setTextColor(5, 150, 105);
    } else {
      doc.setTextColor(100, 116, 139);
    }
    doc.text(categoryText, tableX + colW1 + 4, curY + 5);

    doc.setFont('helvetica', 'bold');
    if (param.passed) {
      doc.setTextColor(5, 150, 105);
    } else {
      doc.setTextColor(225, 29, 72);
    }
    doc.text(`${param.score}/100 [${param.passed ? 'LULUS' : 'REMEDIASI'}]`, tableX + colW1 + colW2 + 4, curY + 5);

    curY += rowH;
  });

  // Overall Score Highlight
  curY += 6;
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(tableX, curY, tableWidth, 12, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(6, 95, 70);
  doc.text(`NILAI TOTAL AKHIR: ${result.weighted_average_score}/100`, tableX + 6, curY + 7.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 118, 110);
  doc.text(
    `Status: ${result.final_status === 'passed' ? 'KOMPETENSI TERPENUHI (LULUS SIMULASI)' : 'BUTUH TINJAUAN MANAJER / OWNER'} • Desain Dukungan 10 Dialek`,
    tableX + 72,
    curY + 7.5
  );

  // Footer Details: Date, Verification Link, Signatures
  const footerY = 162;

  // Left Column: Verification Details & QR Representation
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('SKEMA & CONTOH HASH:', tableX, footerY);

  const verificationHash = result.open_badges_metadata?.verification_hash || 'SHA256:9f4c0882e5b719ad';
  const issueDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Tanggal Penerbitan: ${issueDate}`, tableX, footerY + 5);
  doc.text(`Identifikasi Hash: ${verificationHash.substring(0, 36)}...`, tableX, footerY + 9.5);
  doc.text(`ID Kredensial: ${result.session_id || 'vok-cert-2025'}`, tableX, footerY + 14);

  // Simulated QR Code Box
  const qrX = tableX + 90;
  const qrY = footerY - 2;
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX, qrY, 18, 18, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(15, 23, 42);
  doc.text('QR (pratinjau)', qrX + 9, qrY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5.5);
  doc.setTextColor(100, 116, 139);
  doc.text('W3C DID v1.0', qrX + 9, qrY + 12, { align: 'center' });

  // Center Column: Audit Responsible AI
  const midX = tableX + 118;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('CATATAN DESAIN PENILAIAN:', midX, footerY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('• Evaluator diinstruksikan tidak menilai aksen atau dialek', midX, footerY + 5);
  doc.text('• Dukungan 10 profil dialek: kapabilitas desain, belum divalidasi', midX, footerY + 9.5);
  doc.text('• Kredensial contoh, belum ditandatangani', midX, footerY + 14);

  // Right Column: Digital Signatures
  const rightX = pageWidth - 60;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('PENERBIT (CONTOH):', rightX, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Vokasta', rightX, footerY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Bukan lembaga sertifikasi', rightX, footerY + 18);

  // Decorative Golden Seal / Stamp
  doc.setDrawColor(217, 119, 6);
  doc.setFillColor(254, 243, 199);
  doc.circle(rightX - 16, footerY + 11, 8, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(180, 83, 9);
  doc.text('CONTOH', rightX - 16, footerY + 10, { align: 'center' });
  doc.text('KREDENSIAL', rightX - 16, footerY + 13, { align: 'center' });

  // Bottom Notice
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'Sertifikat hasil simulasi ini diterbitkan untuk keperluan portofolio keterampilan mandiri, latihan kepatuhan industri, dan mobilitas karier.',
    pageWidth / 2,
    pageHeight - 16,
    { align: 'center' }
  );

  // Trigger download
  const safeFilename = `Sertifikat_Kompetensi_${candidateName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
  doc.save(safeFilename);
}
