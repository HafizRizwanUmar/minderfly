import React, { useState } from 'react';

const BotControl = ({ title, description, botScript, icon, color }) => {
    const [status, setStatus] = useState('idle'); // idle, running, success, error

    const handleRun = async () => {
        setStatus('running');
        try {
            const res = await fetch(`http://localhost:3001/api/run/${botScript}`, { method: 'POST' });
            if (res.ok) {
                // Since our server just triggers and returns, we simulate a "running" state for a bit 
                // or wait for a success if we implemented streaming. 
                // For now, let's just show "Started" after a quick delay.
                setTimeout(() => setStatus('success'), 1000);
                setTimeout(() => setStatus('idle'), 5000); // Reset
            } else {
                setStatus('error');
            }
        } catch (e) {
            console.error(e);
            setStatus('error');
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all shadow-md group relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-10 filter blur-3xl ${color.replace('text-', 'bg-')}`}></div>

            <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`text-4xl p-3 bg-gray-900 rounded-lg ${color}`}>{icon}</div>
                {status === 'running' && <div className="text-orange-500 animate-pulse text-sm font-mono">RUNNING...</div>}
                {status === 'success' && <div className="text-green-500 text-sm font-mono">STARTED</div>}
                {status === 'error' && <div className="text-red-500 text-sm font-mono">ERROR</div>}
            </div>

            <h3 className="text-xl font-bold text-white mb-2 relative z-10">{title}</h3>
            <p className="text-gray-400 text-sm mb-6 h-10 relative z-10">{description}</p>

            <button
                onClick={handleRun}
                disabled={status === 'running'}
                className={`w-full py-3 rounded-lg font-bold uppercase tracking-wider transition-all relative z-10 
                    ${status === 'running'
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-gray-700 to-gray-600 hover:from-orange-600 hover:to-red-600 text-white shadow-lg'
                    }`}
            >
                {status === 'running' ? 'Initializing...' : 'Run Agent'}
            </button>
        </div>
    );
};

export default BotControl;
