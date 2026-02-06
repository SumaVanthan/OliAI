import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Server, Key, Eye, CheckCircle2, FileCheck } from 'lucide-react';

function Trust() {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-brand-50/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[100px]" />
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                        <ShieldCheck className="w-3 h-3" />
                        Enterprise Security
                    </div>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-900 mb-6">
                        Uncompromising <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Data Protection</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        We adhere to the strictest global compliance standards. Your data is encrypted, isolated, and protected by defense-in-depth architecture.
                    </p>
                </motion.div>

                {/* Main Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">

                    {/* SOC 2 Card */}
                    <Card delay={0.1}>
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-6 text-emerald-600">
                            <FileCheck className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">SOC 2 Type II Certified</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Verified by independent auditors. We maintain strict controls over security, availability, and confidentiality.
                        </p>
                        <ul className="space-y-3">
                            <ListItem>Annual 3rd-party audits</ListItem>
                            <ListItem>Real-time threat monitoring</ListItem>
                        </ul>
                    </Card>

                    {/* GDPR/Privacy Card - Featured */}
                    <Card delay={0.2} featured={true}>
                        <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-6 text-brand-600">
                            <Lock className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Global Compliance</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Fully compliant with GDPR, CCPA, and HIPAA requirements. You maintain full ownership and control of your data.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            <Badge text="GDPR" />
                            <Badge text="HIPAA" />
                            <Badge text="CCPA" />
                            <Badge text="ISO 27001" />
                        </div>
                    </Card>

                    {/* Architecture Card */}
                    <Card delay={0.3}>
                        <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 text-indigo-600">
                            <Server className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Infrastructure Security</h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Data is encrypted at rest (AES-256) and in transit (TLS 1.3). Multi-tenant isolation ensures zero data leakage.
                        </p>
                        <ul className="space-y-3">
                            <ListItem>AES-256 Encryption</ListItem>
                            <ListItem>VPC Peering Available</ListItem>
                        </ul>
                    </Card>
                </div>

                {/* Bottom Trust Indicators */}
                <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 border-t border-gray-100 pt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <Indicator icon={Key} label="SSO & SAML 2.0 Support" />
                    <Indicator icon={Eye} label="Full Audit Logs" />
                    <Indicator icon={ShieldCheck} label="Zero-Retention Available" />
                </motion.div>

            </div>
        </section>
    );
}

function Card({ children, delay, featured }) {
    return (
        <motion.div
            className={`
                flex flex-col p-8 rounded-3xl border transition-all duration-300 group
                ${featured
                    ? 'bg-white border-brand-100 shadow-xl shadow-brand-900/5 ring-1 ring-brand-50'
                    : 'bg-white border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:border-gray-200'}
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
}

function ListItem({ children }) {
    return (
        <li className="flex items-center gap-2.5 text-gray-600 text-sm font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            {children}
        </li>
    );
}

function Badge({ text }) {
    return (
        <span className="px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-gray-600 text-[11px] font-bold tracking-wider uppercase">
            {text}
        </span>
    );
}

function Indicator({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-50 text-gray-400">
                <Icon className="w-4 h-4" />
            </div>
            <span className="text-gray-500 text-sm font-medium">{label}</span>
        </div>
    );
}

export default Trust;
