import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github, Youtube } from 'lucide-react';

const footerLinks = {
    Product: ['Features', 'Pricing', 'Demo', 'Changelog', 'Roadmap'],
    Solutions: ['Fintech', 'Healthcare', 'E-commerce', 'Real Estate', 'Enterprise'],
    Resources: ['Documentation', 'API Reference', 'Blog', 'Case Studies', 'Webinars'],
    Company: ['About', 'Careers', 'Press', 'Contact', 'Partners']
};

const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Youtube, href: '#', label: 'YouTube' }
];

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-primary-200 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <motion.div
                            className="flex items-center gap-2 mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-10 h-10 rounded-xl bg-accent-600 flex items-center justify-center">
                                <span className="text-white font-heading font-bold text-lg">O</span>
                            </div>
                            <span className="font-heading font-bold text-xl text-primary-900">OliAI</span>
                        </motion.div>
                        <p className="text-primary-500 mb-6 max-w-xs">
                            Voice AI that feels human, not robotic. Building the future of natural conversations.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        className="w-10 h-10 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-500 hover:text-accent-600 hover:border-accent-200 transition-all"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={social.label}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.05 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="font-heading font-semibold text-primary-900 mb-4">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-primary-500 hover:text-accent-600 transition-colors text-sm font-medium"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-primary-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-primary-400 text-sm">
                        © {currentYear} OliAI. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-primary-400 hover:text-primary-600 text-sm transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-primary-400 hover:text-primary-600 text-sm transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="text-primary-400 hover:text-primary-600 text-sm transition-colors">
                            Cookie Settings
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
