import React, { useState, useEffect } from 'react';

const ResultsTable = () => {
    const [dataType, setDataType] = useState('maps');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3001/api/data/${dataType}`)
            .then(res => res.json())
            .then(json => {
                setData(Array.isArray(json) ? json : []); // Ensure array
                setLoading(false);
            })
            .catch(e => {
                console.error(e);
                setLoading(false);
            });
    }, [dataType]);

    const tabs = [
        { id: 'maps', label: 'Google Maps' },
        { id: 'linkedin', label: 'LinkedIn' },
        { id: 'trends', label: 'Trends' },
        { id: 'fiverr', label: 'Fiverr' },
        { id: 'twitter', label: 'Twitter' }
    ];

    return (
        <div className="h-full flex flex-col">
            <div className="flex space-x-2 border-b border-gray-700 pb-4 mb-4 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setDataType(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                            ${dataType === tab.id ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-auto">
                {loading ? (
                    <div className="flex justify-center items-center h-40 text-gray-500">Loading data...</div>
                ) : data.length === 0 ? (
                    <div className="flex justify-center items-center h-40 text-gray-500">No data found for this category yet. Run the bot!</div>
                ) : (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-400">
                            <thead className="text-xs text-gray-300 uppercase bg-gray-700">
                                <tr>
                                    {Object.keys(data[0]).slice(0, 5).map(key => (
                                        <th key={key} scope="col" className="px-6 py-3">
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, idx) => (
                                    <tr key={idx} className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
                                        {Object.values(row).slice(0, 5).map((val, i) => (
                                            <td key={i} className="px-6 py-4 max-w-xs truncate">
                                                {typeof val === 'object' ? JSON.stringify(val) : val}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsTable;
