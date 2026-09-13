import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  setCartOpen,
  setLastGeneratedPass
} from '../redux/slices/cartSlice';
import {
  X,
  Sparkles,
  Ticket,
  CheckCircle2,
  AlertCircle,
  Loader2,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RegistrationModal({ isOpen, onClose, targetEvent, onSuccess }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    student_name: '',
    roll_no: '',
    college: 'Knowledge Institute of Technology',
    department: 'CSE',
    year_of_study: 3,
    email: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registeredPass, setRegisteredPass] = useState(null);

  if (!isOpen && !targetEvent) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Form Validation
    if (!formData.student_name.trim()) {
      setErrorMsg('Please enter student name.');
      return;
    }
    if (!formData.roll_no.trim()) {
      setErrorMsg('Please enter valid college roll number (e.g. 22CS045).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address for ticket delivery.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        event_id: targetEvent?.id,
        ...formData
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      // Success
      setRegisteredPass(data);
      dispatch(setLastGeneratedPass(data));
      if (targetEvent) {
        dispatch(removeFromCart(targetEvent.id));
      }
      triggerConfetti();

      if (onSuccess) onSuccess(data);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg fest-glass rounded-2xl border border-slate-700 shadow-2xl p-6 sm:p-8 my-8 text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Registration Modal"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition touch-target"
        >
          <X className="w-5 h-5" />
        </button>

        {!registeredPass ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Fest Registration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Register for {targetEvent?.title || 'KIOT Fest Event'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Dept: <span className="text-indigo-300 font-semibold">{targetEvent?.department}</span> | Fee:{' '}
                <span className="text-emerald-400 font-bold">
                  {Number(targetEvent?.registration_fee) === 0 ? 'Free' : `₹${targetEvent?.registration_fee}`}
                </span>
              </p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Student Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="student_name"
                  value={formData.student_name}
                  onChange={handleChange}
                  placeholder="e.g. Priyadharshini S"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    College Roll No <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="roll_no"
                    value={formData.roll_no}
                    onChange={handleChange}
                    placeholder="e.g. 22CS045"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500 uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Year of Study</label>
                  <select
                    name="year_of_study"
                    value={formData.year_of_study}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-indigo-500"
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year (Workshop CSE)</option>
                    <option value={4}>4th Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-indigo-500"
                  >
                    <option value="CSE">CSE</option>
                    <option value="AI&DS">AI&DS</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="IT">IT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">College Name</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@kiot.ac.in"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Mobile Number <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-glow-primary transition flex items-center justify-center space-x-2 touch-target"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Confirming Registration...</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-5 h-5 text-amber-300" />
                      <span>Confirm Registration & Generate Pass</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Registration Success State */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-white">Registration Confirmed!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Congratulations <span className="text-indigo-300 font-bold">{registeredPass.student_name}</span>! Your pass for{' '}
              <span className="text-amber-300 font-bold">{registeredPass.event_title || targetEvent?.title}</span> is ready.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-left space-y-2">
              <p className="text-xs text-slate-400">
                Ticket Code: <span className="text-white font-mono font-bold">{registeredPass.ticket_code}</span>
              </p>
              <p className="text-xs text-slate-400">
                Roll No: <span className="text-white font-bold">{registeredPass.roll_no}</span>
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition touch-target"
              >
                Close & Browse More Events
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
