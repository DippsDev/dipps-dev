'use client';

import { useState, useEffect } from 'react';

// Set your launch date here
const LAUNCH_DATE = new Date('2026-04-14T00:00:00');

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/xpqyldvg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '700ms' }}></div>
      </div>

      <div className="max-w-6xl w-full relative z-10 py-8 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Countdown */}
          <div className="text-center lg:text-left px-4 md:px-8 lg:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-white mb-6 md:mb-8 lg:mb-10 drop-shadow-2xl">
              COMING SOON
            </h1>

            {/* Timer labels */}
            <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 md:gap-10 lg:gap-8 mb-3 md:mb-4 text-xs sm:text-sm md:text-base text-gray-500">
              <span className="w-12 sm:w-14 md:w-20 lg:w-16 text-center">Days</span>
              <span className="w-12 sm:w-14 md:w-20 lg:w-16 text-center">Hours</span>
              <span className="w-12 sm:w-14 md:w-20 lg:w-16 text-center">Minutes</span>
              <span className="w-12 sm:w-14 md:w-20 lg:w-16 text-center">Seconds</span>
            </div>

            {/* Timer values */}
            <div className="flex justify-center lg:justify-start gap-2 sm:gap-3 md:gap-5 lg:gap-4 mb-10 md:mb-12 lg:mb-16">
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-gray-600">:</div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-gray-600">:</div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-gray-600">:</div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-lg">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>

            {/* Email subscription */}
            <div className="max-w-md mx-auto lg:mx-0">
              <p className="text-gray-400 mb-4 text-sm sm:text-base md:text-lg">
                Be notified by email as soon as we go live...
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 md:gap-3">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email..."
                  className="flex-1 px-4 py-3 md:py-4 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all text-sm sm:text-base"
                  required
                  disabled={status === 'submitting'}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-white hover:bg-gray-200 disabled:bg-gray-700 text-black px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all flex items-center justify-center shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  {status === 'submitting' ? (
                    <svg className="w-5 h-5 md:w-6 md:h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
              </form>
              {status === 'success' && (
                <p className="text-green-400 text-sm md:text-base mt-2">Thanks! We'll notify you when we launch.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm md:text-base mt-2">Oops! Something went wrong. Please try again.</p>
              )}
            </div>
          </div>

          {/* Right side - Analog Clock */}
          <div className="flex justify-center px-4 md:px-8 lg:px-0 mt-8 lg:mt-0">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-md aspect-square">
              {mounted && (<svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-2xl">
                {/* Clock face background */}
                <circle cx="200" cy="200" r="180" fill="#111827" stroke="#374151" strokeWidth="4" />
                <circle cx="200" cy="200" r="170" fill="none" stroke="#1F2937" strokeWidth="2" />

                {/* Hour markers */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 - 90) * (Math.PI / 180);
                  const x1 = 200 + Math.cos(angle) * 150;
                  const y1 = 200 + Math.sin(angle) * 150;
                  const x2 = 200 + Math.cos(angle) * 160;
                  const y2 = 200 + Math.sin(angle) * 160;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#6B7280"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Minute markers */}
                {[...Array(60)].map((_, i) => {
                  if (i % 5 === 0) return null;
                  const angle = (i * 6 - 90) * (Math.PI / 180);
                  const x1 = 200 + Math.cos(angle) * 155;
                  const y1 = 200 + Math.sin(angle) * 155;
                  const x2 = 200 + Math.cos(angle) * 160;
                  const y2 = 200 + Math.sin(angle) * 160;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#374151"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Hour hand */}
                <line
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos(((timeLeft.hours % 12) * 30 + timeLeft.minutes * 0.5 - 90) * (Math.PI / 180)) * 80}
                  y2={200 + Math.sin(((timeLeft.hours % 12) * 30 + timeLeft.minutes * 0.5 - 90) * (Math.PI / 180)) * 80}
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Minute hand */}
                <line
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos((timeLeft.minutes * 6 - 90) * (Math.PI / 180)) * 120}
                  y2={200 + Math.sin((timeLeft.minutes * 6 - 90) * (Math.PI / 180)) * 120}
                  stroke="#D1D5DB"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* Second hand */}
                <line
                  x1="200"
                  y1="200"
                  x2={200 + Math.cos((timeLeft.seconds * 6 - 90) * (Math.PI / 180)) * 140}
                  y2={200 + Math.sin((timeLeft.seconds * 6 - 90) * (Math.PI / 180)) * 140}
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Center dot */}
                <circle cx="200" cy="200" r="12" fill="#374151" />
                <circle cx="200" cy="200" r="8" fill="#E5E7EB" />

                {/* Outer ring glow */}
                <circle cx="200" cy="200" r="185" fill="none" stroke="#4B5563" strokeWidth="1" opacity="0.3" />
              </svg>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
