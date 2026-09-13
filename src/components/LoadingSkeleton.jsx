import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="fest-glass rounded-2xl overflow-hidden border border-slate-800 p-5 space-y-4 animate-pulse"
        >
          {/* Image placeholder */}
          <div className="h-44 w-full bg-slate-800 rounded-xl" />

          {/* Badges placeholder */}
          <div className="flex gap-2">
            <div className="h-5 w-14 bg-slate-800 rounded-full" />
            <div className="h-5 w-20 bg-slate-800 rounded-full" />
          </div>

          {/* Title placeholder */}
          <div className="h-6 w-3/4 bg-slate-800 rounded-md" />

          {/* Text lines */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-800/60 rounded" />
            <div className="h-3 w-5/6 bg-slate-800/60 rounded" />
          </div>

          {/* Bottom actions */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-800/60">
            <div className="h-5 w-16 bg-slate-800 rounded" />
            <div className="h-9 w-24 bg-slate-800 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
