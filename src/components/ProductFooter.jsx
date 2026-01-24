import React from 'react';
import { Link } from 'react-router-dom';

const ProductFooter = ({ productName }) => {
    return (
        <footer className="bg-black text-white py-8 px-6 md:px-10 border-t border-white/10 font-['Segoe_UI',_sans-serif]">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Left: Branding & Copyright */}
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-lg mb-1">{productName}</h3>
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Minderfly. All rights reserved.
                    </p>
                </div>

                {/* Right: Links */}
                <div className="flex items-center gap-6 text-sm text-gray-300">
                    <Link to="/store" className="hover:text-white transition-colors">Store</Link>
                    <Link to="/" className="hover:text-white transition-colors">Minderfly Home</Link>
                    <a href="#" className="hover:text-white transition-colors">Support</a>
                </div>
            </div>
        </footer>
    );
};

export default ProductFooter;
