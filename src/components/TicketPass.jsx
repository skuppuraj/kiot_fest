import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import {
  Ticket,
  Printer,
  Download,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export default function TicketPass({ ticket }) {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const ticketRef = useRef(null);

  useEffect(() => {
    if (ticket && ticket.ticket_code) {
      QRCode.toDataURL(ticket.ticket_code, {
        width: 160,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error('QR code generation failed:', err));
    }
  }, [ticket]);

  if (!ticket) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 animate-fadeIn">
      {/* Action Buttons (Hidden during printing) */}
      <div className="flex justify-end space-x-3 mb-3 no-print">
        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition flex items-center space-x-2 touch-target"
        >
          <Printer className="w-4 h-4 text-indigo-400" />
          <span>Print Pass</span>
        </button>
      </div>

      {/* Ticket Card */}
      <div
        ref={ticketRef}
        className="fest-ticket-card fest-glass rounded-3xl overflow-hidden border border-indigo-500/30 shadow-2xl relative"
      >
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-6 text-white border-b border-indigo-500/20 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-black shadow-lg">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tight">KIOT FEST 2026</h2>
                <p className="text-xs text-indigo-200 font-medium">Knowledge Institute of Technology</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>CONFIRMED PASS</span>
              </span>
            </div>
          </div>
        </div>

        {/* Ticket Body: Two-Column Layout (Info + QR Code) */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          {/* Left Column: Event & Student Info */}
          <div className="sm:col-span-2 space-y-4">
            <div>
              <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                Event Registered
              </span>
              <h3 className="text-xl font-black text-white mt-0.5">
                {ticket.event_title || 'Technical Symposium Event'}
              </h3>
            </div>

            {/* Student Details Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Attendee Name</span>
                <span className="font-bold text-white text-sm truncate block">{ticket.student_name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Roll Number</span>
                <span className="font-bold text-indigo-300 font-mono text-sm block">{ticket.roll_no}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Department / Year</span>
                <span className="font-medium text-slate-200 block">
                  {ticket.department} • Year {ticket.year_of_study || 3}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">College</span>
                <span className="font-medium text-slate-200 block truncate">{ticket.college || 'KIOT'}</span>
              </div>
            </div>

            {/* Timing & Venue */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-300">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>{ticket.event_date || 'March 25, 2026'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>{ticket.event_time || '10:00 AM'}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{ticket.event_venue || 'KIOT Main Campus'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: QR Code & Verification */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
            {qrCodeUrl ? (
              <div className="bg-white p-2 rounded-xl shadow-md mb-2">
                <img src={qrCodeUrl} alt="Pass QR Code" className="w-28 h-28 object-contain" />
              </div>
            ) : (
              <div className="w-28 h-28 rounded-xl bg-slate-800 animate-pulse mb-2 flex items-center justify-center text-xs text-slate-500">
                Generating QR...
              </div>
            )}

            <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider">
              {ticket.ticket_code}
            </span>
            <p className="text-[9px] text-slate-500 mt-1">Scan at entrance checkpoint</p>
          </div>
        </div>

        {/* Ticket Footer Security Strip */}
        <div className="bg-slate-900/90 px-6 py-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center space-x-1">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>KIOT Fest Organizing Committee</span>
          </div>
          <span className="font-mono text-[10px]">VERIFIED PASS</span>
        </div>
      </div>
    </div>
  );
}
