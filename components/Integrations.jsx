import React from 'react';
import { motion } from 'framer-motion';

const integrations = [
    { name: 'Salesforce', category: 'CRM', img: '/images/logos/salesforce.png' },
    { name: 'HubSpot', category: 'CRM', img: '/images/logos/hubspot.png' },
    { name: 'Zendesk', category: 'Support', img: '/images/logos/zendesk.png' },
    { name: 'Dynamics 365', category: 'Enterprise', img: '/images/logos/dynamics.png' },
    { name: 'Oracle', category: 'Enterprise', img: '/images/logos/oracle.png' },
    { name: 'SAP', category: 'ERP', img: '/images/logos/sap.png' },
    { name: 'Adobe', category: 'Creative', img: '/images/logos/adobe.png' },
    { name: 'Zoho', category: 'Suite', img: '/images/logos/zoho.png' }
];

function IntegrationCard({ item, index }) {
    return (
        <motion.div
            className="flex items-center gap-4 p-4 rounded-xl bg-white border border-primary-200 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
        >
            <div className="w-12 h-12 rounded-lg bg-primary-50 p-2 flex items-center justify-center border border-primary-100">
                <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-contain"
                />
            </div>
            <div>
                <h4 className="text-primary-900 font-semibold">{item.name}</h4>
                <p className="text-primary-500 text-xs font-mono uppercase tracking-wider">{item.category}</p>
            </div>
        </motion.div>
    );
}

function Integrations() {
    return (
        <section id="integrations" className="py-24 relative overflow-hidden bg-gradient-integrations">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-brand-600 font-semibold tracking-wide uppercase text-sm">Integrations</span>
                    <h2 className="font-heading font-bold text-3xl md:text-5xl text-primary-900 mt-4 mb-6">
                        Works with your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">entire stack.</span>
                    </h2>
                    <p className="text-primary-600 max-w-2xl mx-auto text-lg">
                        Connect Oli AI to your CRM, Helpdesk, and internal tools in minutes with our one-click integrations and robust API.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {integrations.map((item, index) => (
                        <IntegrationCard key={item.name} item={item} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-primary-500 text-sm">
                        Don't see your tool? <a href="#" className="text-brand-600 hover:text-brand-700 underline">View API Documentation</a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Integrations;
