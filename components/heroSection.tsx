"use client";

import { motion } from "framer-motion";
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
    return (
        <>
            <section className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 sm:px-8 pt-16 sm:pt-0">
                
                <motion.h2
                {...fadeUpProps(0)} 
                className="text-[clamp(1rem,1vw,1rem)]  text-[#1a1a1a] text-center ">
                    Dipako Thupayatlase
                    </motion.h2> 

                <motion.h1
                    {...fadeUpProps(0)}
                    className="text-[clamp(2rem,4.5vw,3.5rem)] text-center leading-[1.1] max-w-3xl font-bold text-[#1a1a1a]"
                >
                    Full-stack software engineer and system development specialist.
                </motion.h1>

                <motion.p
                    {...fadeUpProps(0.15)}
                    className="mt-0 text-center max-w-lg text-sm sm:text-base leading-relaxed text-[#555]"
                >
                    As a full‑stack software engineer and system development specialist, I have over four years of experience building web applications, automation tools, and end‑to‑end solutions. With a strong foundation in Java and proficiency in React, Node.js, Python, and SQL, I create scalable systems that integrate APIs, databases, and modern user interfaces. From concept to deployment, I deliver maintainable, high‑quality applications and am available for both short‑term and long‑term collaborations.
                </motion.p>

            </section>

            <section className="flex flex-col items-center text-center px-6 sm:px-8 pb-8" id="work" style={{ marginTop: '10px' }}>

                <motion.h1
                    {...fadeUpInViewProps(0)}
                    className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] max-w-3xl font-bold text-[#1a1a1a]"
                >
                    See the projects.
                    Build something better.
                </motion.h1>

                <motion.p
                    {...fadeUpInViewProps(0.15)}
                    className="text-center max-w-lg text-sm sm:text-base leading-relaxed text-[#555]"
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
                        href="/showcase"
                        className="bg-[#1a1a1a] text-white px-8 h-10 w-24 rounded-full text-sm sm:text-base font-normal tracking-wide hover:bg-[#333] transition-colors [font-family:var(--font-roboto)] flex items-center justify-center"
                    >
                        View
                    </Link>
                    <a href="https://github.com/DippsDev" className="text-[#1a1a1a] text-sm sm:text-base border-b border-[#1a1a1a] pb-0.5 hover:opacity-60 transition-opacity w-fit">
                        See all projects
                    </a>
                </motion.div>

                <ServicesSection />

            </section>
        </>
    );
}
