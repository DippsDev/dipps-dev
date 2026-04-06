"use client";

import { motion } from "framer-motion";

const services = [
    {
        title: "Full-Stack Web Development",
        description: "Complete web applications built with Java, React, Node.js, and TypeScript. Scalable, maintainable, and aligned with real-world use cases — cohesive integration between frontend and backend layers.",
    },
    {
        title: "Custom Business Websites",
        description: "Tailored web platforms focused on clarity, usability, and performance. Built to communicate your value effectively with a professional and credible digital presence.",
    },
    {
        title: "Backend & API Development",
        description: "Structured, efficient, and secure systems supporting complex application logic. API-driven architectures enabling seamless communication between services, databases, and external platforms.",
    },
    {
        title: "Automation & Data Solutions",
        description: "Intelligent automation tools and data extraction systems that turn repetitive processes into efficient workflows, enabling better decision-making and operational efficiency.",
    },
];

const ease = "easeOut" as const;

export default function ServicesSection() {
    return (
        <section className="flex flex-col items-center px-6 sm:px-8 pb-12" id="services">

            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0, duration: 0.7, ease }}
                className="text-[clamp(2rem,4.5vw,3.5rem)] text-center leading-[1.1] max-w-3xl font-bold text-[var(--text)] transition-colors duration-300" style={{marginTop:"180px"}}
            >
                Services.
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full" style={{ marginTop: "50px" }}>
                {services.map((service, i) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: i * 0.15, duration: 0.7, ease }}
                        className="flex flex-col items-center text-center gap-4"
                    >
                        <h2 className="text-lg sm:text-xl font-bold text-[var(--text)] transition-colors duration-300">{service.title}</h2>
                        <p className="text-sm sm:text-base leading-relaxed text-[var(--muted)] transition-colors duration-300 max-w-sm">{service.description}</p>
                    </motion.div>
                ))}
            </div>

        </section>



    );
}
