"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  ready: boolean;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return ctx;
}

type Graph = {
  ctx: AudioContext;
  gain: GainNode;
};

export default function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    setReady(true);
  }, []);

  const ensureGraph = useCallback(async () => {
    if (graphRef.current) {
      if (graphRef.current.ctx.state === "suspended") {
        await graphRef.current.ctx.resume();
      }
      return graphRef.current;
    }

    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 280;
    filter.Q.value = 0.55;
    filter.connect(master);

    const startOsc = (type: OscillatorType, freq: number, level: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.value = level;
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
    };

    startOsc("triangle", 73.42, 0.32);
    startOsc("sine", 110, 0.1);
    startOsc("sine", 146.83, 0.07);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.04;
    lfoGain.gain.value = 80;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    graphRef.current = { ctx, gain: master };
    return graphRef.current;
  }, []);

  const toggle = useCallback(async () => {
    const next = !enabled;
    if (next) {
      const graph = await ensureGraph();
      const now = graph.ctx.currentTime;
      graph.gain.gain.cancelScheduledValues(now);
      graph.gain.gain.setValueAtTime(graph.gain.gain.value, now);
      graph.gain.gain.linearRampToValueAtTime(0.045, now + 0.9);
      window.localStorage.setItem("dipps-sound", "on");
    } else if (graphRef.current) {
      const graph = graphRef.current;
      const now = graph.ctx.currentTime;
      graph.gain.gain.cancelScheduledValues(now);
      graph.gain.gain.setValueAtTime(graph.gain.gain.value, now);
      graph.gain.gain.linearRampToValueAtTime(0, now + 0.4);
      window.localStorage.setItem("dipps-sound", "off");
    }
    setEnabled(next);
  }, [enabled, ensureGraph]);

  useEffect(() => {
    const syncVisibility = () => {
      const graph = graphRef.current;
      if (!graph || !enabled) return;
      const now = graph.ctx.currentTime;
      graph.gain.gain.cancelScheduledValues(now);
      graph.gain.gain.setTargetAtTime(document.hidden ? 0 : 0.045, now, 0.15);
    };

    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, [enabled]);

  useEffect(() => {
    return () => {
      const graph = graphRef.current;
      if (!graph) return;
      graph.ctx.close();
      graphRef.current = null;
    };
  }, []);

  return (
    <SoundContext.Provider value={{ enabled, toggle, ready }}>
      {children}
    </SoundContext.Provider>
  );
}
