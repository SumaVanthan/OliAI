import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Building2, ShoppingCart, Heart, GraduationCap,
    ArrowRight, CheckCircle2, TrendingUp, Clock, ShieldCheck
} from 'lucide-react';

const industries = [
    { id: 'bfsi', label: 'BFSI', icon: Building2, color: 'text-brand-600', bg: 'bg-brand-50' },
    { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart, color: 'text-signal-600', bg: 'bg-signal-50' }, // Signal/Amber
    { id: 'healthcare', label: 'Healthcare', icon: Heart, color: 'text-mint-600', bg: 'bg-mint-50' }, // Mint
    { id: 'education', label: 'Education', icon: GraduationCap, color: 'text-sage-600', bg: 'bg-sage-50' } // Sage
];

const useCases = {
    bfsi: [
        {
            title: "Loan Application Follow-up",
            problem: "Leads drop off due to slow manual callbacks.",
            solution: "AI calls applicants within seconds to qualify and collect missing documents.",
            impact: "35% Increase in Conversions"
        },
        {
            title: "Debt Collection",
            problem: "Low recovery rates and high agent stress.",
            solution: "Empathetic, persistent AI agents negotiate payment plans around the clock.",
            impact: "2x Recovery Rate"
        },
        {
            title: "Fraud Verification",
            problem: "Customers wait too long to unblock cards.",
            solution: "Instant automated calls to verify suspicious transactions with zero wait time.",
            impact: "90% Cost Reduction"
        }
    ],
    ecommerce: [
        {
            title: "Abandoned Cart Recovery",
            problem: "Email reminders have low open rates.",
            solution: "AI calls customers to offer a discount or answer doubts about the product.",
            impact: "20% Revenue Lift"
        },
        {
            title: "COD Confirmation",
            problem: "High RTO (Return to Origin) rates on fake orders.",
            solution: "AI confirms availability and intent before shipping the order.",
            impact: "40% Reduction in RTO"
        },
        {
            title: "Post-Purchase Feedback",
            problem: "Low response rates on email surveys.",
            solution: "Engaging voice surveys that capture detailed sentiment and feedback.",
            impact: "5x More Responses"
        }
    ],
    healthcare: [
        {
            title: "Appointment Management",
            problem: "No-shows cause revenue loss and scheduling gaps.",
            solution: "AI calls to confirm, reschedule, or fill cancellation slots automatically.",
            impact: "80% Fewer No-Shows"
        },
        {
            title: "Post-Discharge Follow-up",
            problem: "Nurses are overworked making routine check-up calls.",
            solution: "AI checks on patient vitals and recovery progress, flagging risks to doctors.",
            impact: "Saved 1000+ Nursing Hours"
        },
        {
            title: "Patient Intake Screening",
            problem: "Long wait times for basic symptom triage.",
            solution: "AI collects initial symptoms and history before the doctor's visit.",
            impact: "30% Faster Consultations"
        }
    ],
    education: [
        {
            title: "Admissions Counseling",
            problem: "Counselors can't scale to handle thousands of inquiries.",
            solution: "AI answers course FAQs, qualifies interest, and schedules campus visits.",
            impact: "3x More Enrollments"
        },
        {
            title: "Alumni Fundraising",
            problem: "Generic emails get ignored by alumni.",
            solution: "Personalized voice conversations to reconnect and solicit donations.",
            impact: "2x Donor Engagement"
        },
        {
            title: "Student Retention",
            problem: "At-risk students are identified too late.",
            solution: "Proactive check-ins to identify students struggling with attendance or grades.",
            impact: "15% Lower Dropout Rate"
        }
    ]
};

function UseCases() {
    const [activeTab, setActiveTab] = useState('bfsi');
    const activeIndustry = industries.find(i => i.id === activeTab);

    return (
        <section id="usecases" className="py-24 bg-primary-50 relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/50 skew-x-12 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Use Cases</span>
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-900 mt-2">
                        Built for your industry
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {industries.map((ind) => {
                        const Icon = ind.icon;
                        const isActive = activeTab === ind.id;
                        return (
                            <button
                                key={ind.id}
                                onClick={() => setActiveTab(ind.id)}
                                className={`
                                    flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300
                                    ${isActive
                                        ? 'bg-primary-900 text-white shadow-lg scale-105'
                                        : 'bg-white text-primary-600 hover:bg-white/80 hover:shadow-md border border-primary-200'}
                                `}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : ind.color}`} />
                                {ind.label}
                            </button>
                        );
                    })}
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    <AnimatePresence mode="wait">
                        {useCases[activeTab].map((item, index) => (
                            <motion.div
                                key={`${activeTab}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-8 border border-primary-100 shadow-sm hover:shadow-xl transition-shadow group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start gap-4 mb-4">
                                    <h3 className="font-heading font-bold text-xl text-primary-900">
                                        {item.title}
                                    </h3>
                                    <div className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold ${activeIndustry.bg} ${activeIndustry.color}`}>
                                        {item.impact}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="flex items-center gap-2 text-xs font-bold text-primary-400 uppercase tracking-wider mb-1">
                                            <Clock className="w-3 h-3" /> Problem
                                        </h4>
                                        <p className="text-primary-600 text-sm leading-relaxed">
                                            {item.problem}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-primary-50">
                                        <h4 className="flex items-center gap-2 text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
                                            <CheckCircle2 className="w-3 h-3" /> Solution
                                        </h4>
                                        <p className="text-primary-800 font-medium text-sm leading-relaxed">
                                            {item.solution}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-12 text-center">
                    <button className="inline-flex items-center gap-2 font-heading font-semibold text-primary-900 border-b-2 border-primary-900 pb-0.5 hover:text-brand-600 hover:border-brand-600 transition-colors">
                        See all use cases <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

            </div>
        </section>
    );
}

export default UseCases;
