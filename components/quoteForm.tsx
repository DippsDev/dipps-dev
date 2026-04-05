"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const ease = "easeOut" as const;

function fadeUpProps(delay: number) {
    return {
        initial: { opacity: 0, y: 40 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.7, ease },
    };
}

export default function QuotePage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(false);
        try {
            const res = await fetch("https://formspree.io/f/mreoywdn", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setSubmitted(true);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        }
    }

    return (
        <section className="mt-[200px] min-h-screen flex flex-col items-center px-10 sm:px-16 py-16 sm:py-32 gap-8 sm:gap-12 sm:pt-12" >

            {/* ── Page heading ── */}
            <div className="mt-8 flex flex-col items-center gap-3 text-center w-full">
                {/* ── Back button: in-flow on mobile, absolute on desktop ── */}
                <motion.a
                    {...fadeUpProps(0)}
                    href="/"
                    className="mt-[10px] ml-[5px] self-start mb-6 sm:mb-0 sm:absolute sm:top-8 sm:left-8 flex items-center gap-2 text-sm text-[#1a1a1a] hover:opacity-60 transition-opacity"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 3L5 8L10 13" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back
                </motion.a>

                <motion.h1
                    {...fadeUpProps(0)}
                    className="text-[clamp(1.5rem,6vw,3.5rem)] leading-[1.1] max-w-2xl font-bold text-[#1a1a1a]"
                >
                    Have a project?<br />Let's talk.
                </motion.h1>
                <motion.p
                    {...fadeUpProps(0.15)}
                    className="max-w-xs text-sm sm:text-base leading-relaxed text-[#1a1a1a]"
                >
                    Fill in the form and I'll get back to you within 24 hours — focused and ready to build.
                </motion.p>
            </div>

            {/* ── Two-column layout ── */}
            <motion.div
                {...fadeUpProps(0.3)}
                className="w-full max-w-3xl md:max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start mx-auto"
            >

                {/* ── Left column: trust signals ── */}
                <div className="flex flex-col gap-5 md:gap-8 md:pt-2 items-center md:items-start">
                    <ul className="flex flex-col gap-3 sm:gap-5 items-start w-full max-w-xs">
                        {[
                            { label: "NDA?", detail: "Absolutely just ask." },
                            { label: "24-hour response.", detail: "Fast and focused." },
                            { label: "Senior-level work,", detail: "not outsourced." },
                        ].map(({ label, detail }) => (
                            <li key={label} className="flex items-start gap-3 w-full">
                                <span className="mt-[3px] flex-shrink-0 w-5 h-5 rounded-full border border-[#1a1a1a] flex items-center justify-center">
                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                        <path d="M1 4L3.5 6.5L9 1" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <p className="text-sm sm:text-base leading-relaxed text-[#1a1a1a] min-w-0">
                                    <strong className="text-[#1a1a1a]">{label}</strong> {detail}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="hidden sm:flex flex-col gap-1">
                        <p className="text-base text-[#1a1a1a]">Prefer email?</p>
                        <a
                            href="mailto:dippscloud@icloud.com"
                            className="text-base text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 w-fit hover:opacity-60 transition-opacity"
                        >
                            dippscloud@icloud.com
                        </a>
                    </div>
                </div>

                {/* ── Right column: form ── */}
                <div className="flex flex-col gap-6 items-center md:items-start w-full">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease }}
                            className="flex flex-col gap-3 py-6 sm:py-8 w-full max-w-sm"
                        >
                            <span className="w-5 h-5 rounded-full border border-[#1a1a1a] flex items-center justify-center">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                    <path d="M1 4L3.5 6.5L9 1" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                            <p className="text-[clamp(1.75rem,8vw,3.5rem)] font-bold text-[#1a1a1a] leading-[1.1]">Message sent.</p>
                            <p className="text-sm sm:text-base leading-relaxed text-[#555]">I'll be in touch within 24 hours.</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-7 w-full max-w-sm mx-auto">

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="fullName" className="text-sm sm:text-base text-[#1a1a1a]">
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    placeholder="Jane Doe"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full border-0 border-b border-[#888] py-2.5 text-sm sm:text-base text-[#1a1a1a] placeholder:text-[#777] bg-transparent focus:outline-none focus:border-[#1a1a1a] transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-sm sm:text-base text-[#1a1a1a]">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="jane@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border-0 border-b border-[#888] py-2.5 text-sm sm:text-base text-[#1a1a1a] placeholder:text-[#777] bg-transparent focus:outline-none focus:border-[#1a1a1a] transition-colors"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="message" className="text-sm sm:text-base text-[#1a1a1a]">
                                    Tell me about your project
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    placeholder="What are you building? What's the timeline?"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full border-0 border-b border-[#888] py-2.5 text-sm sm:text-base text-[#1a1a1a] placeholder:text-[#777] bg-transparent focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
                                />
                            </div>

                            <div className="flex flex-col items-center sm:items-start gap-3 mt-1">
                                {error && (
                                    <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                                )}
                                <button
                                    type="submit"
                                    className="bg-[#1a1a1a] text-white px-8 h-11 min-w-[8rem] rounded-full text-sm sm:text-base font-normal tracking-wide hover:bg-[#333] active:scale-[0.98] transition-all [font-family:var(--font-roboto)]"
                                >
                                    Get Proposal
                                </button>
                            </div>

                        </form>
                    )}
                </div>

            </motion.div>
        </section>
    );
}
