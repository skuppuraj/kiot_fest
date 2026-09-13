import React, { useState } from 'react';

export default function RegistrationModal({ event, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rollNo.trim()) {
      setError('Student name and Roll number are required!');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid college email address!');
      return;
    }
    if (formData.phone.length < 10) {
      setError('Please enter a 10-digit mobile number!');
      return;
    }
    onSuccess(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-white space-y-4">
        <h3 className="text-xl font-bold">Register for {event?.title || 'Fest Event'}</h3>
        {error && <p className="text-xs text-rose-400 bg-rose-500/20 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Full Name *</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"
              placeholder="e.g. Priyadharshini S"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Roll Number *</label>
            <input 
              type="text" 
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl uppercase"
              placeholder="e.g. 22CS045"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">College Email *</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"
              placeholder="student@kiot.ac.in"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Mobile Phone *</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl"
              placeholder="9876543210"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-slate-800 rounded-xl font-bold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold">Confirm Registration</button>
          </div>
        </form>
      </div>
    </div>
  );
}
