"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;
const ZONE = "Africa/Gaborone";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease },
});

const socials = [
  { label: "GitHub", href: "https://github.com/DippsDev" },
  { label: "LinkedIn", href: "https://bw.linkedin.com/in/dipako-thupayatlase-46881233b" },
];

function BracketLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="about__link group"
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="about__brack" aria-hidden>
        [
      </span>
      {children}
      <span className="about__brack" aria-hidden>
        ]
      </span>
    </a>
  );
}

function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!now) {
    return (
      <span className="about__time">
        <span className="about__time-h">–– </span>
        <span className="about__time-dots">:</span>
        <span className="about__time-m">––</span>
      </span>
    );
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(now);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "";
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value ?? "";

  return (
    <span className="about__time">
      <span className="about__time-h">{hour} </span>
      <span className="about__time-dots">:</span>
      <span className="about__time-m">
        {minute} {dayPeriod}
      </span>
    </span>
  );
}

export default function AboutPage() {
  return (
    <main className="about">
      <motion.div className="about__image" aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease }}>
        <div className="about__plane" />
      </motion.div>

      <div className="about__body">
        <div className="about__content">
          <motion.p className="chrome about__kicker" initial={{ opacity: 0 }} animate={{ opacity: 0.32 }} transition={{ duration: 0.7, ease }}>
            [About]
          </motion.p>
          <div className="about__copy">
            <motion.p {...fade(0.06)}>
              I&apos;m Dipako, a full-stack software engineer. I specialize in web applications, automation, and end-to-end systems, with a foundation in Java and daily practice in React, Node.js, Python, and SQL.
            </motion.p>
            <motion.p {...fade(0.14)}>
              I build scalable systems that tie APIs, databases, and modern interfaces into something you can ship.
            </motion.p>
            <motion.p {...fade(0.22)}>
              From concept to deployment I deliver maintainable work, and I&apos;m available for both short-term and long-term collaborations.
            </motion.p>
          </div>
          <motion.p className="chrome about__kicker about__kicker--contact" initial={{ opacity: 0 }} animate={{ opacity: 0.32 }} transition={{ delay: 0.28, duration: 0.7, ease }}>
            [Contact]
          </motion.p>
          <motion.nav className="about__socials" aria-label="Elsewhere" {...fade(0.32)}>
            <div className="about__socials-list">
              {socials.map((link) => (
                <BracketLink key={link.href} href={link.href}>
                  {link.label}
                </BracketLink>
              ))}
            </div>
            <div className="about__socials-list">
              <BracketLink href="mailto:dippsinbox@gmail.com">Email</BracketLink>
              <BracketLink href="https://wa.me/26775362329">WhatsApp</BracketLink>
            </div>
          </motion.nav>
        </div>

        <motion.div className="about__bottom" {...fade(0.4)}>
          <h1 className="about__title">
            <span>Dipako</span> <span>Thupayatlase</span> <span>2026 ®</span>
          </h1>
          <div className="about__infos">
            <div className="about__loc-w">
              <div className="about__loc">
                <span>Gaborone (UTC+2)</span> <LocalTime />
              </div>
            </div>
            <div className="about__credit-w">
              <div className="about__credit">
                <span className="about__credit-pre">Design / Dev by</span>{" "}
                <span>Dipako Thupayatlase</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
