'use client';

import { useState } from 'react';
import { ContactSidebar } from '@/components/contact/ContactSidebar';
import { MessageForm } from '@/components/contact/MessageForm';
import { Mail, UserCheck } from 'lucide-react';

export default function ContactPage() {
  const [mobileTab, setMobileTab] = useState<'info' | 'form'>('info');

  return (
    <div className="flex-1 w-full h-full flex flex-col items-center justify-start lg:justify-center px-4 py-2 lg:py-4 overflow-y-auto">
      <div className="w-full max-w-[1150px] flex flex-col gap-4 my-auto">

        {/* Mobile Tab Switcher (< lg) */}
        <div className="flex lg:hidden items-center justify-center p-1 bg-black/40 border border-white/10 rounded-2xl max-w-[400px] w-full mx-auto">
          <button
            onClick={() => setMobileTab('info')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              mobileTab === 'info'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UserCheck size={15} />
            <span>Direct Info</span>
          </button>

          <button
            onClick={() => setMobileTab('form')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all ${
              mobileTab === 'form'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Mail size={15} />
            <span>Send Message</span>
          </button>
        </div>

        {/* Layout container */}
        <div className="w-full flex flex-col lg:flex-row gap-6">
          {/* Contact Sidebar */}
          <div className={`${mobileTab === 'info' ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
            <ContactSidebar />
          </div>

          {/* Message Form */}
          <div className={`${mobileTab === 'form' ? 'block' : 'hidden'} lg:block w-full flex-1`}>
            <MessageForm />
          </div>
        </div>

      </div>
    </div>
  );
}
