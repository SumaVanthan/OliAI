import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Phone } from 'lucide-react';

const features = [
    {
        title: 'Instant Interruption Handling',
        description: 'Change the topic mid-sentence. OliAI keeps up.'
    },
    {
        title: 'Background Noise Filter',
        description: 'Crystal clear voice isolation, even in busy environments.'
    },
    {
        title: 'Emotional Intelligence',
        description: 'Detects tone and adapts responses accordingly.'
    }
];

const conversation = [
    {
        role: 'ai',
        text: "जी हाँ, मैं आपके होम लोन रिन्यूअल में जरूर मदद कर सकता हूँ। मुझे दिख रहा है कि आप 4.2% फिक्स्ड रेट के लिए एलिजिबल हैं। क्या आप चाहेंगे कि मैं ये रेट आपके लिए लॉक कर दूँ?"
    },
    {
        role: 'user',
        text: "रुकिए, एक मिनट... अभी वेरिएबल रेट क्या चल रहा है?"
    },
    {
        role: 'ai',
        text: "बहुत अच्छा सवाल! अभी वेरिएबल रेट प्राइम से 0.5% कम है। मार्केट का ट्रेंड देखते हुए ज्यादातर कस्टमर फिक्स्ड रेट ले रहे हैं, लेकिन फाइनल डिसीजन आपका है!"
    }
];

function LiveDemo() {
    const [visibleMessages, setVisibleMessages] = useState([0]);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Auto-play conversation on mount
        const timers = [];
        conversation.forEach((_, index) => {
            if (index > 0) {
                timers.push(setTimeout(() => {
                    setVisibleMessages(prev => [...prev, index]);
                }, index * 2000));
            }
        });
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <section id="demo" className="py-24 relative overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-blue-50/30 to-primary-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block text-accent-600 text-sm font-bold tracking-wider uppercase mb-4">
                            Live Demo
                        </span>

                        <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary-900 mb-6 leading-tight">
                            Experience the
                            <br />
                            <span className="text-accent-600">human touch.</span>
                        </h2>

                        <p className="text-lg text-primary-600 mb-10 max-w-lg">
                            No more "Press 1 for Sales". OliAI handles complex queries, interruptions, and
                            digressions with grace. It feels just like talking to your best agent.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-5">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    className="flex items-start gap-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent-500 to-indigo-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-semibold text-primary-900 mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-primary-500 text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Chat Interface */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* Chat Card */}
                        <div className="bg-primary-900 rounded-3xl p-6 md:p-8 shadow-2xl shadow-primary-900/20">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-accent-600 flex items-center justify-center">
                                        <span className="text-white font-heading font-bold">O</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-heading font-semibold">OliAI Assistant</h4>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                                            <span className="text-green-400 text-xs font-medium">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-primary-400 text-sm font-mono">00:42</span>
                            </div>

                            {/* Messages */}
                            <div className="space-y-4 min-h-[280px]">
                                <AnimatePresence>
                                    {conversation.map((message, index) => (
                                        visibleMessages.includes(index) && (
                                            <motion.div
                                                key={index}
                                                className={`${message.role === 'user' ? 'ml-4' : ''}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {message.role === 'ai' ? (
                                                    <p className="text-primary-200 leading-relaxed">
                                                        "{message.text}"
                                                    </p>
                                                ) : (
                                                    <div className="bg-primary-800 rounded-2xl px-4 py-3 inline-block">
                                                        <p className="text-white">
                                                            "{message.text}"
                                                        </p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* CTA */}
                            <motion.button
                                className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white/10 text-white font-heading font-semibold hover:bg-white/20 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Test Live Call
                                <Phone className="w-4 h-4" />
                            </motion.button>
                        </div>

                        {/* Decorative Gradient Blur */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-400/20 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default LiveDemo;
