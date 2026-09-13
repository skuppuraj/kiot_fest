import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  MapPin,
  Trophy,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
  Ticket
} from 'lucide-react';

export default function HeroBanner() {
  // Countdown Timer State for Fest Day
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const festTargetDate = new Date('2026-03-25T09:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = festTargetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20">
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[600px] h-72 sm:h-[400px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-48 sm:w-80 h-48 sm:h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-48 sm:w-80 h-48 sm:h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top College Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Annual National Level Inter-College Fest</span>
          </div>

          {/* Fluid Headline */}
          <h1 className="fluid-hero-title font-black tracking-tight text-white mb-4">
            Unleash Your Innovation at{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-clip-text text-transparent">
              KIOT FEST 2026
            </span>
          </h1>

          {/* Subheading */}
          <p className="fluid-subtext text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join South India&apos;s premier symposium of Hackathons, Technical Paper Presentations, Combat Robotics, AI Masterclasses, and Cultural Celebrations.
          </p>

          {/* Fest Date & Venue Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold">March 25 - 26, 2026</span>
            </div>
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>KIOT Campus, Salem, TN</span>
            </div>
            <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>₹1,50,000+ Prize Pool</span>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
            <Link
              href="/events"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-base shadow-glow-primary transition flex items-center justify-center space-x-2 touch-target"
            >
              <span>Explore All Events</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/my-tickets"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white font-semibold text-base transition flex items-center justify-center space-x-2 touch-target"
            >
              <Ticket className="w-5 h-5 text-amber-400" />
              <span>Find My Passes</span>
            </Link>
          </div>

          {/* Live Fest Countdown Cards */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto mb-12">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds }
            ].map((item, idx) => (
              <div
                key={idx}
                className="fest-glass rounded-2xl p-3 sm:p-4 text-center border border-slate-800 shadow-lg"
              >
                <div className="text-xl sm:text-3xl font-black text-white font-mono">
                  {String(item.val).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Highlight Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl font-black text-indigo-400">6+</p>
              <p className="text-xs text-slate-400 mt-0.5">Departments</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl font-black text-amber-400">20+</p>
              <p className="text-xs text-slate-400 mt-0.5">Technical & Cultural Events</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl font-black text-emerald-400">₹1.5L+</p>
              <p className="text-xs text-slate-400 mt-0.5">Cash Prizes & Kits</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-2xl font-black text-purple-400">1,500+</p>
              <p className="text-xs text-slate-400 mt-0.5">Registered Students</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
