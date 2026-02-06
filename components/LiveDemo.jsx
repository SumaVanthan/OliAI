import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RefreshCw, Volume2, Globe, ArrowRight } from 'lucide-react';
import Button from './Button.jsx';

// Demo Data
const demos = {
    us: {
        label: "US English",
        flag: "🇺🇸",
        scenarios: [
            {
                id: 'sales',
                title: 'Sales Qualification',
                text: "Hi there! I'm calling from Oli AI. I noticed you downloaded our whitepaper on voice automation. Just wanted to see if you had any questions about how it could scale your support team?"
            },
            {
                id: 'support',
                title: 'Tech Support',
                text: "Thanks for calling Support. I see you're experiencing latency issues with your dashboard. I can reset that session for you right now—would you like me to go ahead?"
            }
        ]
    },
    uk: {
        label: "UK English",
        flag: "🇬🇧",
        scenarios: [
            {
                id: 'banking',
                title: 'Banking Security',
                text: "Good afternoon. This is a fraud alert from Heritage Bank. We've noticed an unusual transaction of £500. Could you please confirm if this was you?"
            },
            {
                id: 'appointment',
                title: 'Appointment Booking',
                text: "Hello! I'm calling to reschedule your consultation for tomorrow. We have a slot available at 2 PM or 4 PM. Which one would suit you better?"
            }
        ]
    },
    india: {
        label: "Indian English",
        flag: "🇮🇳",
        scenarios: [
            {
                id: 'ecommerce',
                title: 'Order Status',
                text: "Namaste! I'm checking on your order #4521. It is out for delivery and should reach you by 6 PM today. Do you need the delivery agent's number?"
            },
            {
                id: 'feedback',
                title: 'Feedback Collection',
                text: "Hi, thank you for using our service yesterday. On a scale of 1 to 10, how would you rate your experience with our technician?"
            }
        ]
    }
};

function LiveDemo() {
    const [activeRegion, setActiveRegion] = useState('us');
    const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    // Reset when changing region/scenario
    useEffect(() => {
        setIsPlaying(false);
        setProgress(0);
    }, [activeRegion, activeScenarioIndex]);

    // Simulated Audio Progress
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsPlaying(false);
                        return 0;
                    }
                    return prev + 1; // Speed of playback simulation
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const activeDemo = demos[activeRegion];
    const scenario = activeDemo.scenarios[activeScenarioIndex];

    return (
        <section id="demo" className="py-24 relative overflow-hidden bg-sage-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-sm font-semibold mb-6">
                            <Volume2 className="w-4 h-4" />
                            <span>Interactive Demo</span>
                        </div>

                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-900 mb-6 leading-tight">
                            Hear the difference
                            <span className="text-gradient-primary"> human-like AI</span> makes.
                        </h2>

                        <p className="text-lg text-primary-600 mb-8 max-w-lg leading-relaxed">
                            Experience voice AI that understands context, handles interruptions, and speaks with genuine local accents. Pick a region and listen for yourself.
                        </p>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-primary-800 font-medium">
                                <CheckCircleItem text="Sub-second latency (feels instant)" />
                            </div>
                            <div className="flex items-center gap-2 text-primary-800 font-medium">
                                <CheckCircleItem text="Native accents & regional dialects" />
                            </div>
                            <div className="flex items-center gap-2 text-primary-800 font-medium">
                                <CheckCircleItem text="Handles interruptions naturally" />
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button variant="secondary" size="lg" icon={ArrowRight} iconPosition="right">
                                Book a Tailored Demo
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Interactive Player */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative z-10 bg-primary-900 rounded-3xl overflow-hidden shadow-2xl shadow-primary-900/20 border border-primary-800">

                            {/* Player Header / Region Tabs */}
                            <div className="flex items-center justify-between p-2 bg-primary-950/50 backdrop-blur-sm border-b border-primary-800">
                                <div className="flex p-1 gap-1">
                                    {Object.entries(demos).map(([key, data]) => (
                                        <button
                                            key={key}
                                            onClick={() => setActiveRegion(key)}
                                            className={`
                                                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
                                                ${activeRegion === key
                                                    ? 'bg-primary-800 text-white shadow-md'
                                                    : 'text-primary-400 hover:text-white hover:bg-primary-800/50'}
                                            `}
                                        >
                                            <span className="text-lg">{data.flag}</span>
                                            {data.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Main Player Area */}
                            <div className="p-8 md:p-10 flex flex-col items-center text-center">

                                {/* Visualizer Circle */}
                                <div className="relative mb-8 group">
                                    <div className={`absolute inset-0 bg-mint rounded-full blur-2xl transition-opacity duration-300 ${isPlaying ? 'opacity-40 animate-pulse' : 'opacity-10'}`}></div>
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="relative w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30 transition-transform active:scale-95 hover:scale-105"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-10 h-10 text-white fill-current" />
                                        ) : (
                                            <Play className="w-10 h-10 text-white fill-current ml-1" />
                                        )}
                                    </button>

                                    {/* Progress Ring (SVG) */}
                                    <svg className="absolute top-0 left-0 w-24 h-24 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                        <circle
                                            cx="50" cy="50" r="46"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="2"
                                        />
                                        <circle
                                            cx="50" cy="50" r="46"
                                            fill="none"
                                            stroke="#38bdf8"
                                            strokeWidth="2"
                                            strokeDasharray="289"
                                            strokeDashoffset={289 - (289 * progress) / 100}
                                            className="transition-all duration-100 ease-linear"
                                        />
                                    </svg>
                                </div>

                                {/* Scenario Selector */}
                                <div className="space-y-4 w-full max-w-sm">
                                    <div className="flex justify-center gap-2 mb-4">
                                        {activeDemo.scenarios.map((s, idx) => (
                                            <button
                                                key={s.id}
                                                onClick={() => setActiveScenarioIndex(idx)}
                                                className={`h-2 rounded-full transition-all ${idx === activeScenarioIndex ? 'w-8 bg-brand-500' : 'w-2 bg-primary-700 hover:bg-primary-600'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="min-h-[120px]">
                                        <AnimatePresence mode='wait'>
                                            <motion.div
                                                key={`${activeRegion}-${activeScenarioIndex}`}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <h3 className="text-primary-200 text-sm font-medium uppercase tracking-wider mb-2">
                                                    {scenario.title}
                                                </h3>
                                                <p className="text-xl md:text-2xl text-white font-heading font-medium leading-relaxed">
                                                    "{scenario.text}"
                                                </p>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>

                            </div>

                            {/* Footer Status */}
                            <div className="px-6 py-4 bg-primary-950/30 border-t border-primary-800 flex items-center justify-between text-xs font-mono text-primary-400">
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    AI Online
                                </div>
                                <span>Voice Model v2.4</span>
                            </div>

                        </div>

                        {/* Decorative */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function CheckCircleItem({ text }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <span>{text}</span>
        </div>
    );
}

export default LiveDemo;
