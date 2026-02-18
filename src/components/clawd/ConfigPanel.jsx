import React, { useState } from 'react';

const ConfigPanel = ({ config, setConfig }) => {
    const [localConfig, setLocalConfig] = useState(config);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch('http://localhost:3001/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(localConfig)
            });
            setTimeout(() => setSaving(false), 500);
            setConfig(localConfig);
        } catch (e) {
            console.error(e);
            setSaving(false);
        }
    };

    const updateArray = (key, value) => {
        // Value is a comma separated string
        const arr = value.split(',').map(s => s.trim()).filter(s => s);
        setLocalConfig({
            ...localConfig,
            search: {
                ...localConfig.search,
                [key]: arr
            }
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">TARGET KEYWORDS</label>
                <textarea
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors h-24"
                    value={localConfig.search.keywords.join(', ')}
                    onChange={(e) => updateArray('keywords', e.target.value)}
                    placeholder="web design, seo..."
                />
            </div>

            <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">LOCATIONS (Maps)</label>
                <textarea
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors h-24"
                    value={localConfig.search.locations.join(', ')}
                    onChange={(e) => updateArray('locations', e.target.value)}
                    placeholder="New York, London..."
                />
            </div>

            <div>
                <label className="block text-sm font-mono text-gray-400 mb-2">JOB TITLES (LinkedIn)</label>
                <textarea
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors h-24"
                    value={localConfig.search.jobTitles.join(', ')}
                    onChange={(e) => updateArray('jobTitles', e.target.value)}
                    placeholder="CEO, Founder..."
                />
            </div>

            <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg"
            >
                {saving ? 'SAVING...' : 'UPDATE CONFIG'}
            </button>
        </div>
    );
};

export default ConfigPanel;
