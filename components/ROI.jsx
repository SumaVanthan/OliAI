import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Clock } from 'lucide-react';
import Button from './Button.jsx';

// ROI Calculator Component
function ROI() {
    // State for inputs
    const [numAgents, setNumAgents] = useState(50);
    const [callsPerAgent, setCallsPerAgent] = useState(80); // daily calls per agent
    const [handleTime, setHandleTime] = useState(5); // in minutes
    const [agentHourlyCost, setAgentHourlyCost] = useState(20); // $ per hour

    // Calculate Savings
    const savings = useMemo(() => {
        const workingDays = 22; // Monthly working days
        const manualCostPerMonth = numAgents * agentHourlyCost * 8 * workingDays; // Assuming 8 hour shift roughly matched with utilization
        // Or more granular: (Calls * Mins / 60) * Cost
        const totalCallMinutesMonthly = numAgents * callsPerAgent * workingDays * handleTime;
        const totalHoursMonthly = totalCallMinutesMonthly / 60;
        const totalManualCost = totalHoursMonthly * agentHourlyCost;

        // AI Cost Assumption: ~ $0.15/min (example rate)
        const aiCostPerMin = 0.15;
        const totalAiCost = totalCallMinutesMonthly * aiCostPerMin;

        // Savings
        const monthlySavings = totalManualCost - totalAiCost;
        const annualSavings = monthlySavings * 12;

        return {
            annual: Math.max(0, annualSavings), // Ensure no negative savings displayed for weird inputs
            percent: Math.round(((totalManualCost - totalAiCost) / totalManualCost) * 100) || 0
        };
    }, [numAgents, callsPerAgent, handleTime, agentHourlyCost]);

    return (
        <section id="roi" className="py-24 relative bg-brand-50 overflow-hidden text-primary-900">

            {/* Background Decorations - Light Theme */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-200/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-sage-200/40 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-100 text-brand-600 text-sm font-semibold mb-6 shadow-sm">
                            <Calculator className="w-4 h-4" />
                            <span>ROI Calculator</span>
                        </div>

                        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-primary-900 leading-tight">
                            Stop overpaying for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">voice operations.</span>
                        </h2>

                        <p className="text-primary-600 text-lg mb-10 max-w-md">
                            Drastically reduce costs while improving coverage. See how much you could save by switching to Oli AI agents.
                        </p>

                        <div className="bg-white border border-primary-100 rounded-2xl p-8 shadow-xl shadow-brand-900/5 space-y-8 relative overflow-hidden">
                            {/* Glass effect reflection */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent rounded-2xl pointer-events-none"></div>

                            {/* Input: Number of Agents */}
                            <div className="relative z-10">
                                <div className="flex justify-between mb-3">
                                    <label className="text-sm font-semibold text-primary-700">Number of Agents</label>
                                    <span className="font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded text-sm">{numAgents}</span>
                                </div>
                                <input
                                    type="range" min="5" max="500" value={numAgents}
                                    onChange={(e) => setNumAgents(Number(e.target.value))}
                                    className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 transition-all"
                                />
                            </div>

                            {/* Input: Calls per Agent/Day */}
                            <div className="relative z-10">
                                <div className="flex justify-between mb-3">
                                    <label className="text-sm font-semibold text-primary-700">Calls per Agent (Daily)</label>
                                    <span className="font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded text-sm">{callsPerAgent}</span>
                                </div>
                                <input
                                    type="range" min="10" max="200" value={callsPerAgent}
                                    onChange={(e) => setCallsPerAgent(Number(e.target.value))}
                                    className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 transition-all"
                                />
                            </div>

                            {/* Input: Avg Handle Time */}
                            <div className="relative z-10">
                                <div className="flex justify-between mb-3">
                                    <label className="text-sm font-semibold text-primary-700">Avg Handle Time (Mins)</label>
                                    <span className="font-mono font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded text-sm">{handleTime} min</span>
                                </div>
                                <input
                                    type="range" min="1" max="30" value={handleTime}
                                    onChange={(e) => setHandleTime(Number(e.target.value))}
                                    className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 transition-all"
                                />
                            </div>

                        </div>
                    </motion.div>

                    {/* Right: Results Card */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* Decorative blob behind card */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-300 to-indigo-300 rounded-[24px] blur opacity-30"></div>

                        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-[22px] p-8 md:p-12 text-center text-white shadow-2xl relative overflow-hidden ring-1 ring-white/20">

                            {/* Inner Texture */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mixed-blend-overlay"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                            <div className="relative z-10">
                                <span className="text-brand-200 font-bold tracking-wider uppercase text-xs mb-2 block">Projected Annual Savings</span>

                                <div className="my-8">
                                    <span className="font-heading font-bold text-5xl md:text-6xl text-white tracking-tight drop-shadow-sm">
                                        <CountUp end={savings.annual} duration={2} />
                                    </span>
                                    <div className="mt-4 inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-bold border border-white/10 backdrop-blur-md">
                                        <TrendingUp className="w-4 h-4 text-emerald-300" />
                                        <span>Save {savings.percent}% on OpEx</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto mb-10">
                                    <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                                        <Clock className="w-5 h-5 text-brand-200 mx-auto mb-2" />
                                        <div className="text-xl font-bold text-white">24/7</div>
                                        <div className="text-xs text-brand-100/80">Availability</div>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-center">
                                        <DollarSign className="w-5 h-5 text-brand-200 mx-auto mb-2" />
                                        <div className="text-xl font-bold text-white">Zero</div>
                                        <div className="text-xs text-brand-100/80">Overheads</div>
                                    </div>
                                </div>

                                <Button variant="primary" size="lg" className="w-full justify-center shadow-lg shadow-brand-900/30">
                                    Get Your Detailed Report
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Simple CountUp helper for formatting currency
function CountUp({ end, duration }) {
    // Uses Intl.NumberFormat for currency
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });
    return formatter.format(end);
}

export default ROI;
