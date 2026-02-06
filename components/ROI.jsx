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
        <section id="roi" className="py-24 relative bg-primary-900 overflow-hidden text-white">

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-600/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-300 text-sm font-semibold mb-6">
                            <Calculator className="w-4 h-4" />
                            <span>ROI Calculator</span>
                        </div>

                        <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-white leading-tight">
                            Stop overpaying for <br />
                            <span className="text-gradient-light">voice operations.</span>
                        </h2>

                        <p className="text-primary-200 text-lg mb-10 max-w-md">
                            Drastically reduce costs while improving coverage. See how much you could save by switching to Oli AI agents.
                        </p>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm space-y-6">

                            {/* Input: Number of Agents */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-primary-200">Number of Agents</label>
                                    <span className="font-mono font-bold text-brand-400">{numAgents}</span>
                                </div>
                                <input
                                    type="range" min="5" max="500" value={numAgents}
                                    onChange={(e) => setNumAgents(Number(e.target.value))}
                                    className="w-full h-2 bg-primary-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                                />
                            </div>

                            {/* Input: Calls per Agent/Day */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-primary-200">Calls per Agent (Daily)</label>
                                    <span className="font-mono font-bold text-brand-400">{callsPerAgent}</span>
                                </div>
                                <input
                                    type="range" min="10" max="200" value={callsPerAgent}
                                    onChange={(e) => setCallsPerAgent(Number(e.target.value))}
                                    className="w-full h-2 bg-primary-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                                />
                            </div>

                            {/* Input: Avg Handle Time */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-primary-200">Avg Handle Time (Mins)</label>
                                    <span className="font-mono font-bold text-brand-400">{handleTime} min</span>
                                </div>
                                <input
                                    type="range" min="1" max="30" value={handleTime}
                                    onChange={(e) => setHandleTime(Number(e.target.value))}
                                    className="w-full h-2 bg-primary-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                                />
                            </div>

                        </div>
                    </motion.div>

                    {/* Right: Results Card */}
                    <motion.div
                        className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-3xl p-1 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-gradient-ocean rounded-[22px] p-8 md:p-12 h-full flex flex-col justify-center items-center text-center relative overflow-hidden">

                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none" />

                            <div className="relative z-10">
                                <span className="text-brand-300 font-bold tracking-wider uppercase text-sm">Projected Annual Savings</span>

                                <div className="my-8">
                                    <span className="font-heading font-bold text-6xl md:text-7xl text-white tracking-tight">
                                        <CountUp end={savings.annual} duration={2} />
                                    </span>
                                    <div className="mt-2 inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                                        <TrendingUp className="w-4 h-4" />
                                        Save {savings.percent}% on OpEx
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto mb-8">
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <Clock className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-white">24/7</div>
                                        <div className="text-xs text-primary-400">Availability</div>
                                    </div>
                                    <div className="bg-white/5 rounded-xl p-4">
                                        <DollarSign className="w-5 h-5 text-brand-400 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-white">Zero</div>
                                        <div className="text-xs text-primary-400">Overheads</div>
                                    </div>
                                </div>

                                <Button variant="primary" size="lg">
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
