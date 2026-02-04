import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleRefresh = () => {
        // Clear potentially corrupted cache
        localStorage.removeItem('t2f_cached_data');
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
                    <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-2xl border border-red-100">
                        <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <AlertTriangle className="text-red-600" size={40} />
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Something went wrong</h1>
                        <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                            We encountered an unexpected error. This usually happens due to a temporary connection issue or a data sync error.
                        </p>
                        <button
                            onClick={handleRefresh}
                            className="w-full bg-slate-950 hover:bg-amber-500 text-white py-5 rounded-2xl font-black transition-all shadow-xl uppercase tracking-widest text-sm flex items-center justify-center gap-3 active:scale-95"
                        >
                            <RefreshCcw size={20} />
                            Refresh Application
                        </button>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="mt-6 text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest text-[10px] transition-colors"
                        >
                            Try to continue anyway
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
