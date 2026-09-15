import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems, setCartOpen } from '../../redux/slices/cartSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RegistrationModal from '../../components/RegistrationModal';
import { getMockEventById, getAllEventIds } from '../../lib/mockData';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  ArrowLeft,
  Share2,
  Check,
  Plus
} from 'lucide-react';

export async function getStaticPaths() {
  const ids = getAllEventIds();
  const paths = ids.map((id) => ({
    params: { id: id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking' // ISR: new events pre-render on-demand and cache statically
  };
}

export async function getStaticProps({ params }) {
  const event = getMockEventById(params.id);

  if (!event) {
    return {
      notFound: true,
      revalidate: 60
    };
  }

  return {
    props: {
      event,
      renderedAt: new Date().toISOString()
    },
    revalidate: 60 // ISR: Revalidate static HTML at most once every 60 seconds
  };
}

export default function EventDetailPage({ event, renderedAt }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const [copied, setCopied] = useState(false);

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-extrabold mb-4">Event Not Found</h1>
          <p className="text-slate-400 mb-6">The requested event does not exist or has been removed.</p>
          <Link href="/events" className="px-6 py-3 bg-indigo-600 rounded-xl text-sm font-bold">
            Back to All Events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isInCart = cartItems.some((item) => item.id === event.id);
  const seatsLeft = (event.seats_total || 50) - (event.seats_booked || 0);
  const isSoldOut = seatsLeft <= 0;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col justify-between">
      <Head>
        <title>{event.title} | KIOT FEST 2026</title>
        <meta name="description" content={event.description} />
      </Head>

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex-1 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/events"
            className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Event Catalog</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            <Share2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Hero Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {event.department}
            </span>
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Registration Fee</span>
              <span className="text-2xl font-black text-amber-400">
                {Number(event.registration_fee || event.fee || 0) === 0 ? 'FREE' : `₹${event.registration_fee || event.fee}`}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white mt-4 font-outfit tracking-tight">
            {event.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-3xl">
            {event.description}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold mb-1">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Prize</span>
              </div>
              <span className="text-base font-extrabold text-white">{event.prize_pool || event.prize || 'Prizes & Trophies'}</span>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold mb-1">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Date</span>
              </div>
              <span className="text-base font-bold text-white">{event.date || 'March 25, 2026'}</span>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold mb-1">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Availability</span>
              </div>
              <span className={`text-base font-bold ${isSoldOut ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isSoldOut ? 'Sold Out' : `${seatsLeft} Seats Left`}
              </span>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/60">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold mb-1">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Venue</span>
              </div>
              <span className="text-base font-bold text-white">{event.venue || 'KIOT Campus'}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-4">
            {isSoldOut ? (
              <button
                disabled
                className="w-full py-4 rounded-xl bg-slate-800 text-slate-500 font-bold text-sm cursor-not-allowed text-center"
              >
                Registrations Closed
              </button>
            ) : isInCart ? (
              <button
                onClick={() => dispatch(setCartOpen(true))}
                className="w-full py-4 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 font-bold text-sm transition flex items-center justify-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Added to Cart • Open Drawer</span>
              </button>
            ) : (
              <button
                onClick={() => dispatch(addToCart(event))}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Registration Cart</span>
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
