import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mic, Brain, Zap, Globe, Shield, BarChart3
} from 'lucide-react';

const features = [
    {
        icon: Mic,
        title: 'Natural Voice Synthesis',
        description: 'Ultra-realistic voice generation with emotional nuance and breathing patterns.',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        span: 'col-span-1 row-span-2' // Large left card
    },
    {
        icon: Brain,
        title: 'Contextual Intelligence',
        description: 'Understands context and remembers conversations.',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        span: 'col-span-1'
    },
    {
        icon: Zap,
        title: 'Sub-100ms Latency',
        description: 'Real-time responses that feel instantaneous.',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        span: 'col-span-1'
    },
    {
        icon: Globe,
        title: '40+ Languages',
        description: 'Native-quality voice in multiple languages with accent preservation.',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        span: 'col-span-2' // Wide card
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'SOC 2 Type II, GDPR, and HIPAA compliant.',
        color: 'text-slate-600',
        bg: 'bg-slate-100',
        span: 'col-span-1'
    },
    {
        icon: BarChart3,
        title: 'Advanced Analytics',
        description: 'Deep insights into conversation quality and sentiment.',
        color: 'text-cyan-600',
        bg: 'bg-cyan-50',
        span: 'col-span-1'
    }
];

function FeatureCard({ feature, index }) {
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const Icon = feature.icon;

    return (
        <motion.div
            ref={cardRef}
            className={`
                relative overflow-hidden rounded-2xl p-6
                bg-white border border-primary-100
                shadow-sm hover:shadow-lg hover:border-primary-200
                transition-all duration-300 cursor-pointer
                ${feature.span}
            `}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Spotlight Effect */}
            <div
                className="absolute pointer-events-none transition-opacity duration-300 rounded-full"
                style={{
                    left: mousePosition.x - 100,
                    top: mousePosition.y - 100,
                    width: 200,
                    height: 200,
                    background: `radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${feature.color}`} />
                </div>

                <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
                    {feature.title}
                </h3>

                <p className="text-primary-500 text-sm leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
}

function Features() {
    return (
        <section id="features" className="py-24 relative bg-primary-50/50">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-900 mb-4">
                        Built for the future of voice
                    </h2>
                    <p className="text-lg text-primary-500 max-w-xl mx-auto">
                        Everything you need to create voice experiences that feel genuinely human.
                    </p>
                </motion.div>

                {/* Bento Grid - Fixed Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
                    {/* Row 1: Large card + 2 small cards */}
                    <motion.div
                        className="md:row-span-2 bg-white border border-primary-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                            <Mic className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
                            Natural Voice Synthesis
                        </h3>
                        <p className="text-primary-500 text-sm leading-relaxed">
                            Ultra-realistic voice generation with emotional nuance and breathing patterns.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white border border-primary-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-4">
                            <Brain className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
                            Contextual Intelligence
                        </h3>
                        <p className="text-primary-500 text-sm leading-relaxed">
                            Understands context and remembers conversations.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white border border-primary-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                            <Zap className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
                            Sub-100ms Latency
                        </h3>
                        <p className="text-primary-500 text-sm leading-relaxed">
                            Real-time responses that feel instantaneous.
                        </p>
                    </motion.div>

                    {/* Bottom row: 3 cards evenly distributed */}
                    <motion.div
                        className="bg-white border border-primary-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                            <Globe className="w-5 h-5 text-emerald-600" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
                            40+ Languages
                        </h3>
                        <p className="text-primary-500 text-sm leading-relaxed">
                            Native-quality voice in multiple languages with accent preservation.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white border border-primary-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                            <Shield className="w-5 h-5 text-slate-600" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
                            Enterprise Security
                        </h3>
                        <p className="text-primary-500 text-sm leading-relaxed">
                            SOC 2 Type II, GDPR, and HIPAA compliant.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white border border-primary-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center mb-4">
                            <BarChart3 className="w-5 h-5 text-cyan-600" />
                        </div>
                        <h3 className="font-heading font-semibold text-lg text-primary-900 mb-2">
                            Advanced Analytics
                        </h3>
                        <p className="text-primary-500 text-sm leading-relaxed">
                            Deep insights into conversation quality and sentiment.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Features;
