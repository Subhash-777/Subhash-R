'use client';
import { ContactSidebar } from '@/components/contact/ContactSidebar';
import { MessageForm } from '@/components/contact/MessageForm';

export default function ContactPage() {
  return (
    <div className="flex-1 w-full h-full flex items-center justify-center px-4">
      <div className="w-full max-w-[1200px] h-[calc(100vh-320px)] min-h-[500px] max-h-[700px] flex flex-col lg:flex-row gap-6">
        <ContactSidebar />
        <MessageForm />
      </div>
    </div>
  );
}
