import React from 'react';
import { motion } from 'framer-motion';

// CRM/Tool integrations with actual logo images
const leftLogos = [
    { name: 'Zendesk', src: '/images/logos/zendesk.png' },
    { name: 'Oracle', src: '/images/logos/oracle.png' },
    { name: 'Adobe', src: '/images/logos/adobe.png' },
    { name: 'SAP', src: '/images/logos/sap.png' }
];

const rightLogos = [
    { name: 'Dynamics 365', src: '/images/logos/dynamics.png' },
    { name: 'Salesforce', src: '/images/logos/salesforce.png' },
    { name: 'HubSpot', src: '/images/logos/hubspot.png' },
    { name: 'Zoho', src: '/images/logos/zoho.png' }
];

function LogoItem({ logo, index, direction }) {
    return (
        <motion.div
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white shadow-md flex items-center justify-center p-2 overflow-hidden"
            initial={{ opacity: 0, x: direction === 'left' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, y: -2 }}
        >
            {logo.src ? (
                <img
                    src={logo.src}
                    alt={logo.name}
                    className="w-full h-full object-contain"
                />
            ) : (
                <div
                    className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: logo.color }}
                >
                    {logo.initial}
                </div>
            )}
        </motion.div>
    );
}

function Integrations() {
    return (
        <section id="integrations" className="py-20 relative overflow-hidden bg-primary-900">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 opacity-80"></div>

            {/* Subtle glow effects */}
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Top Label */}
                <motion.p
                    className="text-center text-primary-400 text-sm font-medium tracking-widest uppercase mb-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-white font-bold">Works</span> with your existing stack
                </motion.p>

                {/* Main Content Row */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-10">
                    {/* Left Logos */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {leftLogos.map((logo, index) => (
                            <LogoItem key={logo.name} logo={logo} index={index} direction="left" />
                        ))}
                    </motion.div>

                    {/* Center Headline */}
                    <motion.div
                        className="text-center px-6 lg:px-12"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading font-bold text-3xl md:text-4xl text-white leading-tight">
                            Seamless integrations,
                        </h2>
                        <p className="font-heading font-bold text-3xl md:text-4xl bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent italic">
                            zero disruption
                        </p>
                    </motion.div>

                    {/* Right Logos */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        {rightLogos.map((logo, index) => (
                            <LogoItem key={logo.name} logo={logo} index={index} direction="right" />
                        ))}
                    </motion.div>
                </div>

                {/* Subtitle */}
                <motion.p
                    className="text-center text-primary-300 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    Plug in your custom dialer, an enterprise CRM, or internal tools.
                    <br />
                    OliAI integrates seamlessly – so your team doesn't need to change how they work.
                </motion.p>
            </div>
        </section>
    );
}

export default Integrations;
