'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Chatbot from '@/components/chatbot/Chatbot';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <div className="content-area p-6 relative">
          {children}
        </div>
      </div>
      
      {/* Chatbot */}
      <Chatbot />
      
      {/* Digital Signature */}
      <div className="digital-signature">
        Crafted with 💜 by @saake | saake.dev
      </div>
    </div>
  );
}