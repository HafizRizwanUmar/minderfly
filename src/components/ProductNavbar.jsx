import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ProductNavbar = ({ productName, ctaText = "Get Started", ctaLink = "#" }) => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black text-white border-b border-white/10 h-16 flex items-center justify-between px-6 md:px-10 font-['Segoe_UI',_sans-serif]">
            {/* Left: Back Link */}
            <Link
                to="/store"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
                <FaArrowLeft className="text-xs" />
                <span>Back to Store</span>
            </Link>

            {/* Center: Branding */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="font-bold text-xl tracking-tight">
                    {productName}
                </span>
            </div>

            {/* Right: CTA */}
            <div>
                <a
                    href={ctaLink}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition-all border border-white/5"
                >
                    {ctaText}
                </a>
            </div>
        </nav>
    );
};

export default ProductNavbar;
