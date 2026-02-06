import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    PhoneOutgoing, PhoneIncoming, Languages, Workflow,
    CheckCircle2, ArrowRight
} from 'lucide-react';

const capabilities = [
    {
        title: "Outbound Voice AI",
        description: "Scale your reach without losing the human touch. Perfect for growing revenue and engagement.",
        icon: PhoneOutgoing,
        color: "text-brand-600",
        bg: "bg-brand-50",
        gradient: "from-brand-500/20 to-sage-500/20",
        features: ["Lead qualification", "Payment reminders", "Feedback collection"]
    },
    {
        title: "Inbound Voice AI",
        description: "Zero wait times, 24/7 availability. Handle complex queries with empathy and precision.",
        icon: PhoneIncoming,
        color: "text-sage-600",
        bg: "bg-sage-50",
        gradient: "from-sage-500/20 to-mint-500/20",
        features: ["Customer support", "Query handling", "Ticket creation"]
    },
    {
        title: "Multilingual Intelligence",
        description: "Speak your customers' language. Native-quality fluency across key global and regional markets.",
        icon: Languages,
        color: "text-brand-700",
        bg: "bg-brand-100",
        gradient: "from-brand-600/20 to-emerald-500/20",
        features: ["English (Global)", "Hindi & Tamil", "Regional Expansion"]
    },
    {
        title: "Action-Oriented AI",
        description: "Don't just talk—do. Our agents integrate with your systems to perform real tasks instantly.",
        icon: Workflow,
        color: "text-signal-600",
        bg: "bg-orange-50",
        gradient: "from-signal-500/20 to-orange-500/20",
        features: ["CRM updates", "Appointment booking", "Payment triggers"]
    }
];

function CapabilityCard({ capability, index }) {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-3xl border border-primary-200 bg-white p-8 transition-all hover:shadow-xl hover:shadow-primary-900/5 hover:-translate-y-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${capability.gradient}`} />

            <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${capability.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <capability.icon className={`w-7 h-7 ${capability.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-heading font-bold text-2xl text-primary-900 mb-3">
                    {capability.title}
                </h3>
                <p className="text-primary-600 mb-8 leading-relaxed">
                    {capability.description}
                </p>

                {/* Feature List */}
                <ul className="space-y-3">
                    {capability.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-medium text-primary-700">
                            <CheckCircle2 className={`w-4 h-4 ${capability.color}`} />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}

function Features() {
    return (
        <section id="features" className="py-24 relative bg-primary-50">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Capabilities</span>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-900 mt-3 mb-6">
                            Complete Voice AI Platform
                        </h2>
                        <p className="text-lg text-primary-500">
                            Everything you need to automate conversations and drive business results,
                            packaged in an enterprise-grade platform.
                        </p>
                    </motion.div>
                </div>

                {/* Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {capabilities.map((cap, index) => (
                        <CapabilityCard key={index} capability={cap} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
