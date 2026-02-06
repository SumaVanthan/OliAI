import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Button from './Button.jsx';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Capabilities', href: '#features' },
        { label: 'Use Cases', href: '#usecases' },
        { label: 'Experience', href: '#demo' },
        { label: 'Enterprise', href: '#security' },
    ];

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass py-3' : 'py-5 bg-transparent'
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#"
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                >
                    <img src="/images/logos/oli logo.png" alt="Oli AI" className="h-10 w-auto object-contain" />
                    <span className="font-heading font-bold text-xl text-primary-900 tracking-tight">Oli AI</span>
                </motion.a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            className="text-brand-900 hover:text-brand-600 font-medium transition-colors duration-300 text-sm tracking-wide"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            {link.label}
                        </motion.a>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Button variant="primary" size="sm" className="shadow-lg shadow-brand-900/10">
                        Book a Demo
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary-900 p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <motion.div
                className={`md:hidden absolute top-full left-0 right-0 glass shadow-xl ${isMobileMenuOpen ? 'block' : 'hidden'
                    }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -20 }}
            >
                <div className="px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-primary-600 hover:text-brand-600 font-medium py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Button variant="primary" size="sm" className="mt-2 w-full">
                        Book a Demo
                    </Button>
                </div>
            </motion.div>
        </motion.header>
    );
}

export default Navbar;
