import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AppErrorBoundary extends Component<Props, State> {
  props: Props;
  state: State = { hasError: false };

  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('AppErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      let activeLang = 'id';
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          activeLang = window.localStorage.getItem('vokasta_language') || 'id';
        }
      } catch {
        activeLang = 'id';
      }
      const isEn = activeLang === 'en';

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
            <h1 className="text-xl font-bold text-white">
              {isEn ? 'Display issue occurred' : 'Terjadi kendala tampilan'}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isEn
                ? 'Reload the page to continue. Your practice data is not lost if already saved.'
                : 'Muat ulang halaman untuk melanjutkan. Data latihan Anda tidak hilang bila sudah tersimpan.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer shadow-md shadow-amber-500/20"
              >
                {isEn ? 'Reload' : 'Muat Ulang'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
