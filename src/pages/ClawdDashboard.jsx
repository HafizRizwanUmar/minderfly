import React, { useState, useEffect } from 'react';
import BotControl from '../components/clawd/BotControl';
import ConfigPanel from '../components/clawd/ConfigPanel';
import ResultsTable from '../components/clawd/ResultsTable';

const ClawdDashboard = () => {
    const [activeTab, setActiveTab] = useState('control');
    const [config, setConfig] = useState(null);

    // Fetch config on mount
    useEffect(() => {
        fetch('http://localhost:3001/api/config')
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error("Failed to load config:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <header className="mb-8 flex justify-between items-center bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                        🦞 CLAWDBOT
                    </h1>
                    <p className="text-gray-400">Automated Growth Intelligence System</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('control')}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'control' ? 'bg-orange-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        Control Center
                    </button>
                    <button
                        onClick={() => setActiveTab('data')}
                        className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'data' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        Data Vault
                    </button>
                </div>
            </header>

            <main>
                {activeTab === 'control' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <section className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <BotControl
                                    title="Google Trends"
                                    description="Analyze market demand & keywords."
                                    botScript="claw_trends.cjs"
                                    icon="📈"
                                    color="text-blue-400"
                                />
                                <BotControl
                                    title="Google Maps"
                                    description="Scrape local business leads."
                                    botScript="claw_maps.cjs"
                                    icon="📍"
                                    color="text-green-400"
                                />
                                <BotControl
                                    title="LinkedIn B2B"
                                    description="Find decision makers & profiles."
                                    botScript="claw_linkedin.cjs"
                                    icon="💼"
                                    color="text-blue-600"
                                />
                                <BotControl
                                    title="Fiverr Analysis"
                                    description="Spy on marketplace competition."
                                    botScript="claw_fiverr.cjs"
                                    icon="🟢"
                                    color="text-green-500"
                                />
                                <BotControl
                                    title="Gmail Outreach"
                                    description="Draft emails for collected leads."
                                    botScript="claw_gmail.cjs"
                                    icon="📧"
                                    color="text-red-400"
                                />
                            </div>
                        </section>
                        <section className="bg-gray-800 p-6 rounded-2xl border border-gray-700 h-fit sticky top-8">
                            <h2 className="text-xl font-semibold mb-4 text-gray-200">System Configuration</h2>
                            {config ? <ConfigPanel config={config} setConfig={setConfig} /> : <p className="text-gray-500 animate-pulse">Loading Config...</p>}
                        </section>
                    </div>
                )}

                {activeTab === 'data' && (
                    <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 min-h-[600px]">
                        <ResultsTable />
                    </div>
                )}
            </main>
        </div>
    );
};

export default ClawdDashboard;
