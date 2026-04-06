"use client";

import { motion } from "framer-motion";

const ease = "easeOut" as const;

const links = [
    { label: "GitHub", href: "https://github.com/DippsDev" },
    { label: "LinkedIn", href: "https://bw.linkedin.com/in/dipako-thupayatlase-46881233b?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile" },
    { label: "Email", href: "mailto:dippsinbox@gmail.com" },
    { label: "WhatsApp", href: "https://wa.me/27718205387" },
];

export default function FooterSection() {
    return (
        <footer id="contact" className="w-full border-t-2 border-gray-400 dark:border-[rgba(255,255,255,0.15)] px-6 sm:px-8 py-16 flex flex-col items-center gap-10 transition-colors duration-300" style={{ marginTop: "150px" }}>

            <div className="w-full border-t border-black"></div>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease }}
                className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[var(--text)] text-center leading-snug max-w-xl transition-colors duration-300 pt-8" style={{ marginTop: "30px" }}
            >
                Let&apos;s build something together.
            </motion.p>

            <motion.nav
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.6, ease }}
                className="flex flex-wrap justify-center gap-6 sm:gap-8"
            >
                {links.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="text-sm sm:text-lg text-[var(--muted)] border-b border-transparent hover:border-[var(--border)] hover:text-[var(--text)] transition-all duration-300 pb-0.5 [font-family:var(--font-roboto)]"
                    >
                        {link.label}
                    </a>
                ))}
            </motion.nav>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6, ease }}
                className="text-sm text-[var(--muted)] [font-family:var(--font-roboto)] transition-colors duration-300" style={{ marginBottom: "30px" }}
            >
                © {new Date().getFullYear()} DippsDev. All rights reserved.
            </motion.p>

        </footer>
    );
}
