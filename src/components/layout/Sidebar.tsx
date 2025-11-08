'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  Bell, 
  CheckCircle, 
  FileText, 
  Edit, 
  Star, 
  MessageSquare, 
  User, 
  Briefcase, 
  Monitor, 
  Award, 
  Car, 
  Bus, 
  CreditCard, 
  IdCard, 
  Library, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { MENU_ITEMS, MENU_COLORS } from '@/constants';
import { cn } from '@/utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const iconMap = {
  Home,
  Calendar,
  BookOpen,
  Bell,
  CheckCircle,
  FileText,
  Edit,
  Star,
  MessageSquare,
  User,
  Briefcase,
  Monitor,
  Award,
  Car,
  Bus,
  CreditCard,
  IdCard,
  Library,
  Settings,
};

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeMenuItem, setActiveMenuItem] = useState(1);

  const handleMenuClick = (menuItem: typeof MENU_ITEMS[0]) => {
    setActiveMenuItem(menuItem.id);
    router.push(menuItem.url);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      onToggle();
    }
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Home;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="hamburger-btn fixed top-4 left-4 z-50 md:hidden bg-background border border-border rounded-md p-2"
        onClick={onToggle}
        aria-label="Toggle menu"
      >
        <span className={cn("bg-foreground transition-all duration-300 block h-0.5 w-6 mb-1", isOpen ? "rotate-45 translate-y-1.5" : "")}></span>
        <span className={cn("bg-foreground transition-all duration-300 block h-0.5 w-6 mb-1", isOpen ? "opacity-0" : "")}></span>
        <span className={cn("bg-foreground transition-all duration-300 block h-0.5 w-6", isOpen ? "-rotate-45 -translate-y-1.5" : "")}></span>
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "sidebar bg-card border-r border-border transition-all duration-300 ease-in-out z-40 fixed left-0 top-0 h-full shadow-lg",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64",
        "md:translate-x-0 md:w-64"
      )}>
        {/* Logo/Header */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">FeeBank</h1>
          <p className="text-sm text-muted-foreground mt-1">Student Portal</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {MENU_ITEMS.map((menuItem) => {
              const Icon = getIcon(menuItem.icon);
              const isActive = activeMenuItem === menuItem.id || pathname === menuItem.url;
              
              return (
                <li key={menuItem.id}>
                  <button
                    onClick={() => handleMenuClick(menuItem)}
                    className={cn(
                      "menu-item w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ring",
                      isActive
                        ? "bg-accent text-accent-foreground border-l-2"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    style={{
                      borderLeftColor: isActive ? menuItem.color : 'transparent',
                      backgroundColor: isActive ? `${menuItem.color}10` : 'transparent',
                    }}
                  >
                    <div
                      className="menu-icon mr-3 flex items-center justify-center"
                      style={{ color: isActive ? menuItem.color : 'currentColor' }}
                    >
                      <Icon size={20} />
                    </div>
                    
                    <span className="menu-text flex-1 text-left">
                      {menuItem.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">V</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                VINAYAK
              </p>
              <p className="text-xs text-muted-foreground truncate">
                2023BCA1711
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}
    </>
  );
}