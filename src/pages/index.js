import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getAllEvents } from '../lib/db';
import HeroBanner from '../components/HeroBanner';
import EventCard from '../components/EventCard';
import RegistrationModal from '../components/RegistrationModal';
import {
  Sparkles,
  ArrowRight,
  Code,
  Cpu,
  Bot,
  Wrench,
  Building,
  Shield,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Trophy
} from 'lucide-react';

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      initialEvents: events.slice(0, 6), // Top 6 featured events for home
      totalEventCount: events.length
    },
    revalidate: 60 // ISR: Refresh every 60 seconds
  };
}

export default function HomePage({ initialEvents, totalEventCount }) {
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  const departments = [
    { name: 'Computer Science', code: 'CSE', icon: Code, color: 'from-indigo-500 to-blue-600', events: 'Hackathon, Web, Reels' },
    { name: 'AI & Data Science', code: 'AI&DS', icon: Bot, color: 'from-purple-500 to-pink-600', events: 'GenAI Workshop, Prompt Battle' },
    { name: 'Electronics & Comm.', code: 'ECE', icon: Cpu, color: 'from-cyan-500 to-teal-600', events: 'Circuit Debugging, IoT Challenge' },
    { name: 'Mechanical Engg.', code: 'MECH', icon: Wrench, color: 'from-amber-500 to-orange-600', events: 'Robo Wars, 3D CAD Master' },
    { name: 'Civil Engineering', code: 'CIVIL', icon: Building, color: 'from-emerald-500 to-green-600', events: 'Bridge Design, Smart City' },
    { name: 'Information Tech.', code: 'IT', icon: Shield, color: 'from-rose-500 to-red-600', events: 'CTF Cyber Defense, App Dev' }
  ];

  const faqs = [
    {
      q: 'Who is eligible to participate in KIOT Fest 2026?',
      a: 'All undergraduate and postgraduate engineering, arts, and science students from recognized colleges/universities with a valid college ID card are welcome to participate.'
    },
    {
      q: 'Can a student register for multiple events across different departments?',
      a: 'Yes! You can use our registration cart to add multiple events across departments (e.g. Web Hackathon in CSE and Robo Wars in MECH) as long as their timings do not clash.'
    },
    {
      q: 'How do I receive and present my event pass?',
      a: 'Upon registration, an instant digital QR Pass is generated on your screen. You can also retrieve your pass anytime under the "My Passes" section by entering your college roll number.'
    },
    {
      q: 'Are food and accommodation provided?',
      a: 'Lunch and refreshment kits are provided for all registered participants. Outstation participants requiring hostel accommodation can contact the fest coordinator in advance.'
    }
  ];

  return (
    <>
      <Head>
        <title>KIOT FEST 2026 | National Level Symposium - Knowledge Institute of Technology</title>
      </Head>

      <div className="space-y-16 sm:space-y-24 pb-16">
        {/* Hero Section */}
        <HeroBanner />

        {/* Department Showcase Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Disciplinary Excellence</span>
            </div>
            <h2 className="fluid-section-title font-black text-white">Events by Department</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Explore flagship competitions, workshops, and symposiums organized by each engineering department.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {departments.map((dept) => {
              const IconComp = dept.icon;
              return (
                <Link
                  key={dept.code}
                  href={`/events?dept=${dept.code}`}
                  className="fest-glass rounded-2xl p-5 sm:p-6 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr ${dept.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition">
                    {dept.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-indigo-400 font-semibold mt-1">
                    {dept.code} Department
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-2 line-clamp-1">
                    {dept.events}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Events Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Flagship Highlights</span>
              </div>
              <h2 className="fluid-section-title font-black text-white">Featured Competitions</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Top prize-pool events and masterclasses currently open for student registration.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 font-bold text-sm group"
            >
              <span>View All {totalEventCount} Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onQuickRegister={(evt) => setSelectedEventForModal(evt)}
              />
            ))}
          </div>
        </section>

        {/* 2-Day Schedule & Timeline */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="fluid-section-title font-black text-white">Fest Schedule & Timeline</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Mark your calendars for two action-packed days of technology and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Day 1 */}
            <div className="fest-glass rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Day 1</span>
                  <h3 className="text-xl font-extrabold text-white">March 25, 2026</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                  Hackathons & Technical
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">09:00 AM - 09:45 AM</p>
                    <p className="text-slate-400">Grand Inauguration Ceremony & Chief Guest Keynote (Main Auditorium)</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">09:30 AM - 03:30 PM</p>
                    <p className="text-slate-400">Web Hackathon 2026 & Circuit Debugging Prelims</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">01:30 PM - 05:00 PM</p>
                    <p className="text-slate-400">Cyber Defense CTF & CAD 3D Modeling Finals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="fest-glass rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Day 2</span>
                  <h3 className="text-xl font-extrabold text-white">March 26, 2026</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                  Robo Wars & AI Workshops
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">09:00 AM - 01:00 PM</p>
                    <p className="text-slate-400">GenAI & LLM Masterclass Hands-on Workshop</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">11:00 AM - 04:00 PM</p>
                    <p className="text-slate-400">Robo Wars Metal Carnage in Open Air Amphitheatre</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">04:30 PM - 06:00 PM</p>
                    <p className="text-slate-400">Valedictory Ceremony, Cash Prize & Trophy Distribution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="fluid-section-title font-black text-white">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Everything you need to know about registering and attending KIOT Fest 2026.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="fest-glass rounded-2xl border border-slate-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between text-white font-bold text-sm sm:text-base touch-target"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fest-glass rounded-3xl p-8 sm:p-12 border border-indigo-500/30 text-center relative overflow-hidden bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-950">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3">
              Ready to Showcase Your Talent?
            </h2>
            <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
              Limited seats are available per department event. Secure your spot and grab exciting certificates and cash prizes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/events"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-glow-primary transition touch-target"
              >
                Register For Events Now
              </Link>
              <Link
                href="/my-tickets"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition touch-target"
              >
                Lookup Existing Pass
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for quick register */}
      {selectedEventForModal && (
        <RegistrationModal
          isOpen={!!selectedEventForModal}
          onClose={() => setSelectedEventForModal(null)}
          targetEvent={selectedEventForModal}
        />
      )}
    </>
  );
}
