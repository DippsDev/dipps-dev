"use client";

import { motion } from "framer-motion";

const ease = "easeOut" as const;

const links = [
    { label: "GitHub", href: "https://github.com/DippsDev" },
    { label: "LinkedIn", href: "https://bw.linkedin.com/in/dipako-thupayatlase-46881233b?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&to=dippsinbox@gmail.com" },
];

export default function FooterSection() {
    return (
        <footer id="contact" className="w-full border-t border-[#1a1a1a]/10 px-6 sm:px-8 py-16 flex flex-col items-center gap-10" style={{ marginTop: "150px" }}>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease }}
                className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[#1a1a1a] text-center leading-snug max-w-xl" style={{ marginTop: "30px" }}
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
                        className="text-sm sm:text-lg text-[#555] border-b border-transparent hover:border-[#555] hover:text-[#1a1a1a] transition-all pb-0.5 [font-family:var(--font-roboto)]"
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
                className="text-sm text-[#aaa] [font-family:var(--font-roboto)]" style={{ marginBottom: "30px" }}
            >
                © {new Date().getFullYear()} D.Developments. All rights reserved.
            </motion.p>

        </footer>
    );
}
