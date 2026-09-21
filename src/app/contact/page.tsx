'use client';
import { ContactSidebar } from '@/components/contact/ContactSidebar';
import { MessageForm } from '@/components/contact/MessageForm';

export default function ContactPage() {
  return (
    <div className="flex-1 w-full h-full flex items-start lg:items-center justify-center px-4 py-2 lg:py-4 overflow-y-auto">
      <div className="w-full max-w-[1150px] flex flex-col lg:flex-row gap-6 my-auto">
        <ContactSidebar />
        <MessageForm />
      </div>
    </div>
  );
}
