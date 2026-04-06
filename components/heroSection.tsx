"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import ServicesSection from "@/components/servicesSection";

const ease = "easeOut" as const;

function fadeUpProps(delay: number) {
    return {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.7, ease },
    };
}

function fadeUpInViewProps(delay: number) {
    return {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 as const },
        transition: { delay, duration: 0.7, ease },
    };
}

export default function HeroSection() {
    const [isLightMode, setIsLightMode] = useState(() => {
        // Initialize based on system preference
        if (typeof window !== 'undefined') {
            return !window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return true; // fallback for SSR
    });

    const [mounted, setMounted] = useState(false);
    const [showLinks, setShowLinks] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
            const isDark = e.matches;
            setIsLightMode(!isDark);
        };

        // Set initial theme
        updateTheme(mediaQuery);

        // Listen for changes
        mediaQuery.addEventListener("change", updateTheme);

        return () => {
            mediaQuery.removeEventListener("change", updateTheme);
        };
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = isLightMode ? "light" : "dark";
    }, [isLightMode]);

    const icon = isLightMode ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
    ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    );

    return (
        <>
            <section className="relative min-h-screen flex flex-col items-center justify-center gap-4 px-6 sm:px-8 pt-16 sm:pt-0">
                {mounted && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setIsLightMode(prev => !prev)}
                        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--button-bg)] text-[var(--button-text)] shadow-sm transition hover:bg-[var(--surface)] focus:outline-none focus:ring-0 focus-visible:ring-0"
                        aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
                    >
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={isLightMode ? "moon" : "sun"}
                                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                                className="flex items-center justify-center"
                            >
                                {icon}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                )}

                <motion.h2
                {...fadeUpProps(0)} 
                className="text-[clamp(1rem,1vw,1rem)] text-[var(--text)] text-center">
                    Dipako Thupayatlase
                    </motion.h2> 

                <motion.h1
                    {...fadeUpProps(0)}
                    className="text-[clamp(2rem,4.5vw,3.5rem)] text-center leading-[1.1] max-w-3xl font-bold text-[var(--text)]"
                >
                    Full-stack software engineer and system development specialist.
                </motion.h1>

                <motion.p
                    {...fadeUpProps(0.15)}
                    className="mt-0 text-center max-w-lg text-sm sm:text-base leading-relaxed text-[var(--muted)]"
                >
                    As a full‑stack software engineer and system development specialist, I have over four years of experience building web applications, automation tools, and end‑to‑end solutions. With a strong foundation in Java and proficiency in React, Node.js, Python, and SQL, I create scalable systems that integrate APIs, databases, and modern user interfaces. From concept to deployment, I deliver maintainable, high‑quality applications and am available for both short‑term and long‑term collaborations.
                </motion.p>

            </section>

            <section className="flex flex-col items-center text-center px-6 sm:px-8 pb-8" id="work" style={{ marginTop: '10px' }}>

                <motion.h1
                    {...fadeUpInViewProps(0)}
                    className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] max-w-3xl font-bold text-[var(--text)]"
                >
                    See the projects.
                    Build something better.
                </motion.h1>

                <motion.p
                    {...fadeUpInViewProps(0.15)}
                    className="text-center max-w-lg text-sm sm:text-base leading-relaxed text-[var(--muted)]"
                    style={{ marginTop: '24px' }}
                >
                    Explore a track record of real solutions: a full website built for a rigging and transportation company, web scrapers that automate data extraction, and complete web and mobile applications designed from frontend to backend. I’ve engineered API‑driven systems, integrated complex databases, and delivered automation tools that streamline workflows. Each project reflects a focus on usability, scalability, and maintainability—proof that better builds start with proven results.
                </motion.p>

                <motion.div
                    {...fadeUpInViewProps(0.3)}
                    className="flex flex-col items-center gap-3"
                    style={{ marginTop: '20px' }}
                >
                    <Link
                        href=""
                        onClick={(e) => { e.preventDefault(); setShowLinks(prev => !prev); }}
                        className="bg-[var(--border)] text-[var(--button-text)] px-8 h-10 w-24 rounded-full text-sm sm:text-base font-normal tracking-wide hover:bg-slate-900 dark:bg-black dark:text-white transition-colors duration-300 [font-family:var(--font-roboto)] flex items-center justify-center"
                    >
                        View
                    </Link>
                    <AnimatePresence>
                        {showLinks && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col gap-2 mt-4" style={{marginBottom:"30px", marginTop:"20px"}}
                            >
                                <a href="https://mennoskoffiebar.nl/" className="text-[var(--text)] text-sm sm:text-base border-b border-[var(--border)] pb-0.5 hover:opacity-60 transition-opacity w-fit">Menno's Koffiebar.</a>
                                <a href="https://smithtransport.co.bw/" className="text-[var(--text)] text-sm sm:text-base border-b border-[var(--border)] pb-0.5 hover:opacity-60 transition-opacity w-fit">Smith Transport & Rigging.</a>
                                <a href="https://website-beta-pearl-26.vercel.app/" className="text-[var(--text)] text-sm sm:text-base border-b border-[var(--border)] pb-0.5 hover:opacity-60 transition-opacity w-fit">Label Maker Pro.</a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <a href="https://github.com/DippsDev" className="text-[var(--text)] text-sm sm:text-base border-b border-[var(--border)] pb-0.5 hover:opacity-60 transition-opacity w-fit">
                        See all projects
                    </a>
                </motion.div>

                <ServicesSection />

            </section>
        </>
    );
}
