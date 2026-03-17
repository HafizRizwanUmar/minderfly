import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    FaUsers, FaBook, FaFileAlt, FaEnvelope, FaCog, 
    FaPlus, FaSearch, FaBell, FaSignOutAlt, FaChartLine 
} from 'react-icons/fa';
import SEOHead from '../components/SEOHead';
import './AcademyAdmin.css';

const AcademyAdmin = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const stats = [
        { label: 'Total Students', value: '1,240', icon: <FaUsers />, color: 'bg-blue-500' },
        { label: 'Resources', value: '450', icon: <FaBook />, color: 'bg-green-500' },
        { label: 'Articles', value: '82', icon: <FaFileAlt />, color: 'bg-purple-500' },
        { label: 'New Queries', value: '12', icon: <FaEnvelope />, color: 'bg-orange-500' },
    ];

    const SidebarItem = ({ id, icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all ${
                activeTab === id 
                ? 'bg-accent text-dark font-bold' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div className="academy-admin-layout min-h-screen bg-[#0a0a0a] text-white flex font-sans">
            <SEOHead title="Academy Admin Dashboard | Quran O Itrat Academy" />

            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col">
                <div className="p-8 border-b border-white/10">
                    <h1 className="text-xl font-bold tracking-tighter">
                        ACADEMY <span className="text-accent">ADMIN</span>
                    </h1>
                </div>
                
                <nav className="flex-1 py-6">
                    <SidebarItem id="overview" icon={<FaChartLine />} label="Overview" />
                    <SidebarItem id="resources" icon={<FaBook />} label="Resources" />
                    <SidebarItem id="articles" icon={<FaFileAlt />} label="Articles" />
                    <SidebarItem id="queries" icon={<FaEnvelope />} label="Queries" />
                    <SidebarItem id="settings" icon={<FaCog />} label="Settings" />
                </nav>

                <div className="p-6 border-t border-white/10">
                    <button className="flex items-center gap-3 text-slate-500 hover:text-red-400 transition-colors">
                        <FaSignOutAlt /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                {/* Header */}
                <header className="h-20 border-b border-white/10 flex items-center justify-between px-10">
                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                        <input 
                            type="text" 
                            placeholder="Search everything..." 
                            className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2 w-80 text-sm focus:outline-none focus:border-accent"
                        />
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <button className="relative text-slate-400 hover:text-white">
                            <FaBell />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold">Qamar Abbas</p>
                                <p className="text-xs text-slate-500">Academy Owner</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-accent text-dark flex items-center justify-center font-bold">
                                QA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard View */}
                <div className="p-10 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Welcome Back, Qamar</h2>
                            <p className="text-slate-500">Here's what's happening with your academy today.</p>
                        </div>
                        <button className="btn btn-primary bg-accent text-dark px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                            <FaPlus /> Add New Resource
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
                            >
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-xl mb-4`}>
                                    {stat.icon}
                                </div>
                                <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
                                <h3 className="text-3xl font-bold">{stat.value}</h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Content */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-white/5 rounded-3xl border border-white/10 p-8">
                            <h3 className="text-xl font-bold mb-6">Recent Articles</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-accent/30 transition-all cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden">
                                                <img src={`/quranoitratacademy/thumnail.png`} alt="Article" className="w-full h-full object-cover opacity-50" />
                                            </div>
                                            <div>
                                                <p className="font-bold">The Importance of Tajweed</p>
                                                <p className="text-xs text-slate-500">Published • 2 days ago</p>
                                            </div>
                                        </div>
                                        <button className="text-slate-500 hover:text-white">Edit</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
                            <h3 className="text-xl font-bold mb-6">Recent Queries</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center text-xs font-bold">
                                            JD
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">John Doe <span className="text-[10px] text-slate-500 ml-2 font-normal">1 hr ago</span></p>
                                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">"I would like to inquire about the online classes for kids..."</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 py-3 bg-white/10 rounded-xl text-sm font-bold hover:bg-white/20 transition-all">
                                View All Queries
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AcademyAdmin;
