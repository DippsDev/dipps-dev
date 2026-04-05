"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ease = "easeOut" as const;

function fadeUpInViewProps(delay: number) {
    return {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 as const },
        transition: { delay, duration: 0.7, ease },
    };
}

const projects = [
    {
        title: "Label Maker Pro",
        description:
            "Professional shipping label generation for UPS, FedEx, USPS, Purolator, and Canada Post. Fast, reliable, and affordable.",
        image: "/projects/Screenshot 2026-04-05 115257.png",
        tags: ["SaaS", "React", "Node.js"],
    },
    {
        title: "Smart Livestock Management",
        description:
            "Real-time GPS tracking, health monitoring, and herd analytics — all in one platform built for modern livestock farmers.",
        image: "/projects/Screenshot 2026-04-05 115612.png",
        tags: ["GPS Tracking", "Next.js", "PostgreSQL"],
    },
    {
        title: "Menno's Koffiebar",
        description:
            "Specialty coffee catering website for events across the Netherlands. Full booking flow and multi-language support.",
        image: "/projects/Screenshot 2026-04-05 114440.png",
        tags: ["Business", "Next.js", "CMS"],
    },
    {
        title: "Smith Transport & Rigging",
        description:
            "Corporate site for a transport and heavy equipment rigging company serving local and regional markets in Botswana.",
        image: "/projects/Screenshot 2026-04-05 114529.png",
        tags: ["Corporate", "React", "Tailwind"],
    },
];

export default function ShowcasePage() {
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollToProject = (index: number) => {
        const target = projectRefs.current[index];
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <main className="min-h-screen bg-white px-6 sm:px-8 pt-32 pb-32 flex flex-col items-center text-center relative" style={{marginBottom:""}}>
            <Link href="/" className="absolute top-4 left-4 text-[#1a1a1a] hover:text-[#555] transition-colors text-sm font-medium">
                ← Back
            </Link>
            <div className="max-w-4xl w-full">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="text-center mb-24"
                >
                    
                    <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-[#1a1a1a] leading-[1.1] mb-5" style={{marginBottom:"10px" , marginTop:"80px"}}>
                        Projects I've built.
                    </h1>
                </motion.div>

                {/* Projects List */}
                <div className="flex flex-col gap-24 items-center">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            {...fadeUpInViewProps(0)}
                            ref={(el) => {
                                projectRefs.current[i] = el;
                            }}
                            className="flex flex-col gap-5"
                        >
                            <div className="flex flex-col items-center gap-4 w-full sm:flex-row sm:items-center sm:justify-between sm:gap-12">
                                <button
                                    type="button"
                                    onClick={() => scrollToProject(i - 1)}
                                    disabled={i === 0}
                                    className="text-sm font-medium text-[#1a1a1a] underline hover:text-[#555] disabled:cursor-not-allowed disabled:text-[#ccc] disabled:no-underline"
                                >
                                    Prev
                                </button>

                                <div className="flex-1 max-w-4xl overflow-hidden rounded-xl">
                                    <a href="">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-contain"
                                        />
                                    </a>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => scrollToProject(i + 1)}
                                    disabled={i === projects.length - 1}
                                    className="text-sm font-medium text-[#1a1a1a] underline hover:text-[#555] disabled:cursor-not-allowed disabled:text-[#ccc] disabled:no-underline"
                                >
                                    Next
                                </button>
                            </div>

                            {/* Divider */}
                            {i < projects.length - 1 && (
                                <div className="mt-4 border-t border-[#ebebeb]" />
                            )}
                        </motion.div>
                    ))}
                </div>

            </div>
        </main>
    );
}