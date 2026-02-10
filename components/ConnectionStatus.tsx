
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { APP_VERSION } from '../constants';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ConnectionStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState<boolean | null>(null);
    const [latency, setLatency] = useState<number | null>(null);
    const [checking, setChecking] = useState(false);

    const checkConnection = async () => {
        setChecking(true);
        const start = Date.now();
        try {
            const { count, error } = await supabase.from('packages').select('*', { count: 'exact', head: true });
            if (error) throw error;
            setLatency(Date.now() - start);
            setIsOnline(true);
        } catch (err) {
            console.error('Connection check failed:', err);
            setIsOnline(false);
            setLatency(null);
        } finally {
            setChecking(false);
        }
    };

    useEffect(() => {
        checkConnection();
        // Check every 30 seconds
        const interval = setInterval(checkConnection, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleReload = () => {
        window.location.reload();
    };

    if (!isOnline && isOnline !== false) return null; // Initial state

    return (
        <div className={`fixed bottom-0 left-0 right-0 p-2 text-xs font-mono text-white flex justify-between items-center z-[9999] ${isOnline ? 'bg-green-600/90' : 'bg-red-600/90'}`}>
            <div className="flex items-center space-x-4">
                <span className="font-bold">v{APP_VERSION}</span>
                <div className="flex items-center space-x-1">
                    {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
                    <span>{isOnline ? 'Connected' : 'Disconnected'}</span>
                </div>
                {latency && <span>{latency}ms</span>}
            </div>

            <div className="flex items-center space-x-4">
                <span>Supabase: {SUPABASE_URL.substring(8, 20)}...</span>
                <button
                    onClick={handleReload}
                    className="flex items-center space-x-1 bg-black/20 hover:bg-black/40 px-2 py-1 rounded transition-colors"
                >
                    <RefreshCw size={10} className={checking ? 'animate-spin' : ''} />
                    <span>Force Reload</span>
                </button>
            </div>
        </div>
    );
};

export default ConnectionStatus;
