import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems, setCartOpen } from '../redux/slices/cartSlice';
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Check,
  Plus,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';

export default function EventCard({ event, onQuickRegister }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const isInCart = cartItems.some((item) => item.id === event.id);
  const isSoldOut = Number(event.seats_booked) >= Number(event.seats_total);
  const seatsRemaining = Math.max(0, Number(event.seats_total) - Number(event.seats_booked));

  // Department Badges Color Map
  const getDeptBadgeClass = (dept) => {
    switch (dept?.toUpperCase()) {
      case 'CSE':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'ECE':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'AI&DS':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'MECH':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'CIVIL':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'IT':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  const handleAddToCart = () => {
    if (!isInCart && !isSoldOut) {
      dispatch(addToCart(event));
      dispatch(setCartOpen(true));
    }
  };

  return (
    <div className="fest-glass rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800/80 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 group">
      <div>
        {/* Banner Image Container */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950">
          <img
            src={event.banner_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80'}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${getDeptBadgeClass(
                event.department
              )}`}
            >
              {event.department}
            </span>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-200 border border-slate-700/60">
              {event.category}
            </span>
          </div>

          {/* Seat Availability Tag */}
          <div className="absolute bottom-3 left-3">
            {isSoldOut ? (
              <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-md bg-rose-500/90 text-white shadow-md">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Housefull</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
                <span>{seatsRemaining} seats left</span>
              </span>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
            {event.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Key Meta Details */}
          <div className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-400">
                <Calendar className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>{event.time?.split('-')[0]}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-slate-400">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>

            {event.prize_pool && (
              <div className="flex items-center space-x-2 text-amber-300 font-semibold pt-1">
                <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="truncate">Prize: {event.prize_pool}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/40">
        <div className="flex items-center justify-between gap-2 mt-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Entry Fee
            </span>
            <span className="text-base sm:text-lg font-black text-white">
              {Number(event.registration_fee) === 0 ? 'Free' : `₹${event.registration_fee}`}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Details Link */}
            <Link
              href={`/events/${event.id}`}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition touch-target"
              title="View full event details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Quick Register / Cart Button */}
            {isSoldOut ? (
              <button
                disabled
                className="px-3.5 py-2.5 rounded-xl bg-slate-800/50 text-slate-500 font-semibold text-xs border border-slate-700/40 cursor-not-allowed touch-target"
              >
                Closed
              </button>
            ) : isInCart ? (
              <button
                onClick={() => dispatch(setCartOpen(true))}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center space-x-1.5 touch-target"
              >
                <Check className="w-4 h-4" />
                <span>In Cart</span>
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-glow-primary transition flex items-center space-x-1 touch-target"
              >
                <Plus className="w-4 h-4" />
                <span>Register</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
