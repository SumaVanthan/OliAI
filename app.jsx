import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx'; // Capabilities
import LiveDemo from './components/LiveDemo.jsx';
import UseCases from './components/UseCases.jsx';
import ROI from './components/ROI.jsx';
import Trust from './components/Trust.jsx';
import Integrations from './components/Integrations.jsx';
import Footer from './components/Footer.jsx';

function LoadingScreen() {
    return (
        <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="flex flex-col items-center gap-6">
                <div className="loading-pulse"></div>
                <motion.p
                    className="text-primary-400 font-heading text-sm tracking-widest uppercase"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Oli AI
                </motion.p>
            </div>
        </motion.div>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loading" />}
            </AnimatePresence>

            <div className="atmosphere"></div>

            <AnimatePresence>
                {!isLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Navbar />
                        <main>
                            <Hero />
                            <Features />
                            <LiveDemo />
                            <UseCases />
                            <ROI />
                            <Trust />
                            <Integrations />
                        </main>
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
