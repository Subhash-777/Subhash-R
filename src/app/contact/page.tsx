'use client';
import { ContactSidebar } from '@/components/contact/ContactSidebar';
import { MessageForm } from '@/components/contact/MessageForm';

export default function ContactPage() {
  return (
    <div className="flex-1 w-full h-full flex lg:items-center justify-center px-4 overflow-y-auto">
      <div className="w-full max-w-[1200px] lg:h-[calc(100vh-320px)] lg:min-h-[500px] lg:max-h-[700px] flex flex-col lg:flex-row gap-6 py-6 lg:py-0 mb-24 lg:mb-0">
        <ContactSidebar />
        <MessageForm />
      </div>
    </div>
  );
}
