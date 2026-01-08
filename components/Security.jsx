import React from 'react';
import { motion } from 'framer-motion';
import {
    Shield, Lock, Server, FileCheck, Globe, Zap, Check, ArrowRight
} from 'lucide-react';
import Button from './Button.jsx';

const securityFeatures = [
    { icon: Shield, label: 'SOC 2 Type II', description: 'Independently audited security controls' },
    { icon: Lock, label: 'End-to-end Encryption', description: 'TLS 1.3 for all data in transit' },
    { icon: FileCheck, label: 'GDPR Compliant', description: 'Full data portability & deletion rights' },
    { icon: Server, label: 'HIPAA Ready', description: 'Healthcare-grade data protection' },
    { icon: Globe, label: 'Data Residency', description: 'Choose US, EU, or APAC regions' },
    { icon: Zap, label: '99.99% Uptime', description: 'Enterprise SLA with credits' }
];

function Security() {
    return (
        <section id="enterprise" className="py-24 relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-100"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block text-accent-600 text-sm font-bold tracking-wider uppercase mb-4">
                        Enterprise
                    </span>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-900 mb-4">
                        Built for security-first teams
                    </h2>
                    <p className="text-xl text-primary-600 max-w-2xl mx-auto">
                        Enterprise-grade security and compliance, trusted by Fortune 500 companies.
                    </p>
                </motion.div>

                {/* Security Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {securityFeatures.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.label}
                                className="glass-card rounded-2xl p-6 bg-white"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-accent-600" />
                                </div>
                                <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
                                    {feature.label}
                                </h3>
                                <p className="text-primary-500 text-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA Banner */}
                <motion.div
                    className="rounded-3xl p-8 md:p-12 text-center bg-gradient-to-br from-primary-900 to-primary-800 text-white shadow-2xl shadow-primary-900/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="font-heading font-bold text-3xl mb-4">
                        Ready to transform your voice experience?
                    </h3>
                    <p className="text-primary-200 mb-8 max-w-xl mx-auto">
                        Join thousands of companies using Oli to deliver exceptional voice experiences at scale.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button variant="secondary" size="lg" className="border-transparent hover:bg-white hover:text-primary-900">
                            Start Free Trial
                        </Button>
                        <Button variant="glass" size="lg" className="text-white border-white/20 hover:bg-white/10">
                            Contact Sales
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Security;
