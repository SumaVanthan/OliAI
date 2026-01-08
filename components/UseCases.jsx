import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Megaphone, Users, Wallet, Headphones, BarChart3, HelpCircle,
    Target, Filter, Send, Gift, MessageSquare, RefreshCw
} from 'lucide-react';

const categories = [
    { id: 'marketing', label: 'MARKETING & SALES', icon: Megaphone },
    { id: 'customer', label: 'CUSTOMER EXPERIENCE', icon: Users },
    { id: 'collections', label: 'COLLECTIONS', icon: Wallet },
    { id: 'agent', label: 'AGENT ASSIST', icon: Headphones },
    { id: 'analytics', label: 'ANALYTICS', icon: BarChart3 },
    { id: 'helpdesk', label: 'INTERNAL HELP DESK', icon: HelpCircle }
];

const useCasesByCategory = {
    marketing: [
        { icon: Target, title: 'Lead Generation & Qualification', description: 'Agentic AI captures, qualifies leads, schedules meetings automatically.', color: 'text-rose-600', bg: 'bg-rose-50' },
        { icon: Filter, title: 'Funnel Drop-Off Recovery', description: 'Identify drop-offs, re-engage prospects via smart nudges, recover conversions.', color: 'text-violet-600', bg: 'bg-violet-50' },
        { icon: Send, title: 'Campaign & New-Launch Outreach', description: 'Personalized outreach at scale; announce launches, nurture interest.', color: 'text-orange-600', bg: 'bg-orange-50' }
    ],
    customer: [
        { icon: Users, title: 'Customer Onboarding', description: 'Guide new customers through setup with personalized voice assistance.', color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: MessageSquare, title: 'Support Ticket Resolution', description: 'Resolve common issues instantly with intelligent voice responses.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { icon: RefreshCw, title: 'Retention & Loyalty', description: 'Proactive outreach to at-risk customers with personalized offers.', color: 'text-purple-600', bg: 'bg-purple-50' }
    ],
    collections: [
        { icon: Wallet, title: 'Payment Reminders', description: 'Automated, friendly reminders that maintain customer relationships.', color: 'text-green-600', bg: 'bg-green-50' },
        { icon: RefreshCw, title: 'Payment Plan Setup', description: 'Negotiate and set up payment plans conversationally.', color: 'text-teal-600', bg: 'bg-teal-50' },
        { icon: Target, title: 'Dispute Resolution', description: 'Handle billing disputes with empathy and efficiency.', color: 'text-amber-600', bg: 'bg-amber-50' }
    ],
    agent: [
        { icon: Gift, title: 'Upsell / Cross-Sell & Loyalty Promotions', description: 'Recommend relevant add-ons, trigger timed offers, boost loyalty.', color: 'text-pink-600', bg: 'bg-pink-50' },
        { icon: MessageSquare, title: 'Survey / Feedback Collection', description: 'Collect structured feedback conversationally, summarize insights for teams.', color: 'text-cyan-600', bg: 'bg-cyan-50' },
        { icon: RefreshCw, title: 'Renewals (Accounts & Subscriptions)', description: 'Proactive renewal engine that personalizes offers and nudges customers.', color: 'text-indigo-600', bg: 'bg-indigo-50' }
    ],
    analytics: [
        { icon: BarChart3, title: 'Conversation Analytics', description: 'Deep insights into call quality, sentiment, and outcomes.', color: 'text-blue-600', bg: 'bg-blue-50' },
        { icon: Target, title: 'Performance Dashboards', description: 'Real-time metrics on agent and AI performance.', color: 'text-violet-600', bg: 'bg-violet-50' },
        { icon: Filter, title: 'Conversion Tracking', description: 'Track leads through the funnel with voice interaction data.', color: 'text-emerald-600', bg: 'bg-emerald-50' }
    ],
    helpdesk: [
        { icon: HelpCircle, title: 'IT Support Automation', description: 'Password resets, ticket creation, and common IT queries.', color: 'text-slate-600', bg: 'bg-slate-100' },
        { icon: Users, title: 'HR Self-Service', description: 'Leave requests, policy questions, and benefits inquiries.', color: 'text-rose-600', bg: 'bg-rose-50' },
        { icon: MessageSquare, title: 'Knowledge Base Access', description: 'Voice-powered search through internal documentation.', color: 'text-amber-600', bg: 'bg-amber-50' }
    ]
};

function UseCases() {
    const [activeCategory, setActiveCategory] = useState('marketing');

    return (
        <section id="usecases" className="py-24 relative bg-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary-900 mb-4">
                        Deploy AI Agents Across Your Business
                    </h2>
                </motion.div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-[240px_1fr] gap-8">
                    {/* Left Sidebar - Category Tabs */}
                    <motion.div
                        className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {categories.map((category) => {
                            const Icon = category.icon;
                            const isActive = activeCategory === category.id;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap
                                        transition-all duration-200 shrink-0
                                        ${isActive
                                            ? 'bg-accent-50 text-accent-700 border-l-4 border-accent-500'
                                            : 'text-primary-500 hover:bg-primary-50 border-l-4 border-transparent'
                                        }
                                    `}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-accent-600' : 'text-primary-400'}`} />
                                    <span className="text-xs font-semibold tracking-wide">
                                        {category.label}
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Right Content - Use Case Cards */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <AnimatePresence mode="wait">
                            {useCasesByCategory[activeCategory].map((useCase, index) => {
                                const Icon = useCase.icon;
                                return (
                                    <motion.div
                                        key={`${activeCategory}-${index}`}
                                        className="bg-white border border-primary-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all cursor-pointer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${useCase.bg} flex items-center justify-center mb-4`}>
                                            <Icon className={`w-5 h-5 ${useCase.color}`} />
                                        </div>
                                        <h3 className="font-heading font-semibold text-base text-primary-900 mb-2">
                                            {useCase.title}
                                        </h3>
                                        <p className="text-primary-500 text-sm leading-relaxed">
                                            {useCase.description}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UseCases;
