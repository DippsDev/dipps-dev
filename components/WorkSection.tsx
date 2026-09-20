"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useLenis } from "lenis/react";
import { type Project } from "@/lib/projects";
import { useWork } from "./WorkProvider";

const spring = { stiffness: 48, damping: 20, mass: 0.85, restDelta: 0.001 };
const cardSpring = { stiffness: 54, damping: 16, mass: 0.95, restDelta: 0.001 };

function CornerBrackets() {
  return (
    <>
      <span className="plane-bracket plane-bracket--left" aria-hidden>
        <svg width="7" height="211" viewBox="0 0 7 211" fill="none">
          <path d="M7 210H1V1H7" stroke="currentColor" strokeWidth="0.7" />
        </svg>
      </span>
      <span className="plane-bracket plane-bracket--right" aria-hidden>
        <svg width="7" height="211" viewBox="0 0 7 211" fill="none">
          <path d="M0 1H6V210H0" stroke="currentColor" strokeWidth="0.7" />
        </svg>
      </span>
    </>
  );
}

function PlaneCard({
  project,
  index,
  lastIndex,
  progress,
  active,
  onSelect,
}: {
  project: Project;
  index: number;
  lastIndex: number;
  progress: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
}) {
  const reduce = useReducedMotion();
  const span = Math.max(lastIndex, 1);
  const dist = useTransform(progress, (value) => value * span - index);
  const scaleRaw = useTransform(dist, (d) => 1 - Math.min(1, Math.abs(d)) * 0.12);
  const yRaw = useTransform(dist, (d) => Math.max(-1.2, Math.min(1.2, d)) * -40);
  const rotateYRaw = useTransform(dist, (d) => Math.max(-1, Math.min(1, d)) * -18);
  const fadeRaw = useTransform(dist, (d) => 0.4 + (1 - Math.min(1, Math.abs(d))) * 0.6);
  const imgScaleRaw = useTransform(dist, (d) => 1.18 - (1 - Math.min(1, Math.abs(d))) * 0.18);
  const insetRaw = useTransform(dist, (d) => Math.min(18, Math.abs(d) * 15));
  const scale = useSpring(scaleRaw, cardSpring);
  const y = useSpring(yRaw, cardSpring);
  const rotateY = useSpring(rotateYRaw, cardSpring);
  const fade = useSpring(fadeRaw, cardSpring);
  const imgScale = useSpring(imgScaleRaw, cardSpring);
  const inset = useSpring(insetRaw, cardSpring);
  const clipPath = useTransform(inset, (value) => `inset(${value}% 0%)`);

  return (
    <motion.button
      type="button"
      className={`plane-card${active ? " is-active" : ""}`}
      onClick={onSelect}
      aria-current={active ? "true" : undefined}
      aria-label={`${project.name} ${project.index}`}
      style={reduce ? undefined : { scale, y }}
    >
      <div className="plane-card__shell">
        <motion.div
          className="plane-card__frame"
          style={reduce ? undefined : { opacity: fade, rotateY, clipPath }}
        >
          {project.image ? (
            <motion.div className="plane-card__media" style={reduce ? undefined : { scale: imgScale }}>
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="36vw"
                className="object-cover object-top"
              />
            </motion.div>
          ) : (
            <span className="chrome plane-card__label">[{project.index}]</span>
          )}
        </motion.div>
        <CornerBrackets />
        <span className="chrome plane-card__open">
          <span>Open</span>
        </span>
        {project.duration ? (
          <span className="chrome plane-card__time">
            <span>{project.duration}</span>
          </span>
        ) : null}
      </div>
    </motion.button>
  );
}

export default function WorkSection() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { featured, setFeatured, goTo, registerSection, visible } = useWork();
  const [shift, setShift] = useState(0);
  const lastIndex = Math.max(visible.length - 1, 0);
  const featuredRef = useRef(featured);
  const skipClick = useRef(false);
  const lenis = useLenis();
  const progress = useMotionValue(0);
  featuredRef.current = featured;

  useEffect(() => {
    registerSection(containerRef.current);
    return () => registerSection(null);
  }, [registerSection]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const origin = { x: 0, y: 0, yLast: 0, id: -1, axis: "" as "" | "x" | "y" };

    const scrollerTop = () => document.scrollingElement?.scrollTop ?? window.scrollY;

    const applyScroll = (deltaY: number) => {
      const scroller = document.scrollingElement;
      if (!scroller) return;
      const top = Math.min(Math.max(0, scrollerTop() + deltaY), scroller.scrollHeight - window.innerHeight);
      if (lenis) {
        lenis.scrollTo(top, { immediate: true, force: true });
      } else {
        scroller.scrollTop = top;
      }
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      origin.x = event.clientX;
      origin.y = event.clientY;
      origin.yLast = event.clientY;
      origin.id = event.pointerId;
      origin.axis = "";
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerId !== origin.id || event.pointerType === "mouse") return;
      const dx = event.clientX - origin.x;
      const dy = event.clientY - origin.y;
      if (!origin.axis) {
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
        origin.axis = Math.abs(dy) > Math.abs(dx) ? "y" : "x";
      }
      if (origin.axis !== "y") return;
      event.preventDefault();
      applyScroll(origin.yLast - event.clientY);
      origin.yLast = event.clientY;
    };

    const onUp = (event: PointerEvent) => {
      if (event.pointerId !== origin.id) return;
      const dx = event.clientX - origin.x;
      const dy = event.clientY - origin.y;
      const axis = origin.axis;
      origin.id = -1;
      origin.axis = "";
      if (axis === "y") {
        skipClick.current = true;
        return;
      }
      if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
      skipClick.current = true;
      const at = featuredRef.current;
      goTo(dx < 0 ? Math.min(at + 1, lastIndex) : Math.max(at - 1, 0));
    };

    const onCancel = () => {
      origin.id = -1;
      origin.axis = "";
    };

    section.addEventListener("pointerdown", onDown);
    section.addEventListener("pointermove", onMove, { passive: false, capture: true });
    section.addEventListener("pointerup", onUp);
    section.addEventListener("pointercancel", onCancel);
    const onTouchMove = (event: TouchEvent) => {
      if (origin.axis === "y") event.preventDefault();
    };
    section.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointermove", onMove, { capture: true });
      section.removeEventListener("pointerup", onUp);
      section.removeEventListener("pointercancel", onCancel);
      section.removeEventListener("touchmove", onTouchMove);
    };
  }, [goTo, lastIndex, lenis]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      if (track.children.length < 2) {
        setShift(0);
        return;
      }
      const first = track.children[0] as HTMLElement;
      const last = track.children[track.children.length - 1] as HTMLElement;
      setShift(last.offsetLeft - first.offsetLeft);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [visible]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const read = () => {
      const range = section.offsetHeight - window.innerHeight;
      if (range <= 0) {
        progress.set(0);
        return;
      }
      const next = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / range));
      progress.set(next);
    };

    read();
    const unsub = lenis?.on("scroll", read);
    const scroller = document.scrollingElement;
    scroller?.addEventListener("scroll", read, { passive: true });
    window.addEventListener("scroll", read, { passive: true, capture: true });
    window.addEventListener("resize", read);
    window.visualViewport?.addEventListener("resize", read);
    window.visualViewport?.addEventListener("scroll", read);
    return () => {
      unsub?.();
      scroller?.removeEventListener("scroll", read);
      window.removeEventListener("scroll", read, { capture: true });
      window.removeEventListener("resize", read);
      window.visualViewport?.removeEventListener("resize", read);
      window.visualViewport?.removeEventListener("scroll", read);
    };
  }, [lenis, progress, visible.length]);

  const rawX = useTransform(progress, (value) => -shift * value);
  const x = useSpring(rawX, spring);

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.round(value * lastIndex);
    if (featuredRef.current !== next) setFeatured(next);
  });

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative"
      style={{ height: `${Math.max(visible.length, 1) * 100}vh`, touchAction: "pan-y" }}
    >
      <div className="plane-stage">
        <motion.div ref={trackRef} className="plane-track" style={{ x }}>
          {visible.map((project, index) => (
            <PlaneCard
              key={project.index}
              project={project}
              index={index}
              lastIndex={lastIndex}
              progress={progress}
              active={featured === index}
              onSelect={() => {
                if (skipClick.current) {
                  skipClick.current = false;
                  return;
                }
                goTo(index);
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
