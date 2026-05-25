'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const SUBJECTS = [
  'Job Opportunity',
  'Research Collaboration',
  'Project Inquiry',
  'Open Source Contribution',
  'General Question',
];

const TRUST_BADGES = [
  { icon: '🔒', label: '100% Privacy' },
  { icon: '⚡', label: 'Quick Response' },
  { icon: '💼', label: 'Open to Work' },
  { icon: '🌍', label: 'Global Collab' },
];

export function MessageForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name    = 'Name is required';
    if (!form.email.trim()) e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.subject)      e.subject = 'Please select a subject';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setFormState('sending');

    // Simulate API call
    await new Promise(r => setTimeout(r, 1800));
    setFormState('success');
  };

  const inputClass = (field: string) =>
    `glass-input w-full ${errors[field] ? 'border-red-500/60 focus:border-red-500' : ''}`;

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full gap-4 text-center p-8"
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}>
          <CheckCircle size={64} className="text-green-400" />
        </motion.div>
        <h3 className="text-xl font-bold text-white">Message Sent!</h3>
        <p className="text-sm text-gray-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
        <button
          onClick={() => { setFormState('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
          className="text-xs text-violet-400 hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col h-full p-8 lg:p-12 glass-card border-white/5 rounded-3xl w-full flex-1 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="mb-8 z-10">
        <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
        <p className="text-sm text-gray-400">Fill in the form below and I'll respond as soon as possible.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-[11px] font-medium text-gray-400 uppercase tracking-wider pl-1">Name</label>
            <input
              id="contact-name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="John Doe"
              className={`w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/5 transition-all ${errors.name ? 'border-red-500/50' : ''}`}
            />
            {errors.name && <span className="text-[10px] text-red-400 pl-1">{errors.name}</span>}
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-[11px] font-medium text-gray-400 uppercase tracking-wider pl-1">Email</label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="john@example.com"
              className={`w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/5 transition-all ${errors.email ? 'border-red-500/50' : ''}`}
            />
            {errors.email && <span className="text-[10px] text-red-400 pl-1">{errors.email}</span>}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-subject" className="text-[11px] font-medium text-gray-400 uppercase tracking-wider pl-1">Subject</label>
          <div className="relative">
            <select
              id="contact-subject"
              value={form.subject}
              onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
              className={`w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-sm text-white appearance-none cursor-pointer focus:outline-none focus:border-violet-500/50 focus:bg-white/5 transition-all ${errors.subject ? 'border-red-500/50' : ''}`}
            >
              <option value="" disabled className="bg-[#0f0822] text-gray-500">Select a topic...</option>
              {SUBJECTS.map(s => <option key={s} value={s} className="bg-[#0f0822] text-gray-200">{s}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
          </div>
          {errors.subject && <span className="text-[10px] text-red-400 pl-1">{errors.subject}</span>}
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <div className="flex justify-between items-end pl-1 pr-2">
            <label htmlFor="contact-message" className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Message</label>
            <span className="text-[10px] text-gray-600 font-mono">{form.message.length} / 2000</span>
          </div>
          <textarea
            id="contact-message"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Tell me about your project, research, or just say hi..."
            maxLength={2000}
            className={`w-full flex-1 bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:bg-white/5 transition-all resize-none ${errors.message ? 'border-red-500/50' : ''}`}
          />
          {errors.message && <span className="text-[10px] text-red-400 pl-1">{errors.message}</span>}
        </div>

        <div className="pt-2">
          <motion.button
            id="send-btn"
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={formState === 'sending'}
            className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-3 transition-all disabled:opacity-70 shadow-[0_10px_30px_rgba(124,58,237,0.2)] hover:shadow-[0_10px_40px_rgba(124,58,237,0.4)]"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #8b5cf6, #a855f7)' }}
          >
            {formState === 'sending' ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send size={18} /> Send Message
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
