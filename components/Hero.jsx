import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Button from './Button.jsx';
import VoiceBlob from './VoiceBlob.jsx';

function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background VoiceBlob - now transparent light liquid */}
            <VoiceBlob />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }} // Snappier animation
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-200 shadow-sm mb-8"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-sm text-primary-600 font-medium">Now available for enterprise</span>
                    </motion.div>

                    {/* Main Headline */}
                    <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 text-primary-900">
                        Voice AI that feels
                        <br />
                        <span className="skewed-highlight text-primary-900 z-10 relative">human, not robotic</span>
                    </h1>

                    {/* Subheadline */}
                    <motion.p
                        className="text-xl md:text-2xl text-primary-600 max-w-2xl mx-auto mb-10 font-body"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Next-generation voice intelligence that's emotionally expressive,
                        naturally conversational, and remarkably human-like.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button variant="primary" size="lg" icon={ArrowRight}>
                            Start Building Free
                        </Button>
                        <Button variant="secondary" size="lg" icon={Play} iconPosition="left">
                            Watch Demo
                        </Button>
                    </motion.div>


                </motion.div>
            </div>

            {/* Gradient Overlay at bottom - Light fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-50 to-transparent pointer-events-none z-20"></div>
        </section>
    );
}

export default Hero;
