"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { 
  Video, 
  Code2, 
  FileText, 
  HelpCircle, 
  Menu, 
  X,
  Bell,
  Star,
  Heart,
  Sparkles,
  Wand2,
   Database,
  Rainbow,
  StickyNote
} from "lucide-react";

const navItems = [
  { 
    label: "MockInterview", 
    href: "/dashboard", 
    icon: Video,
    description: "Practice Interviews",
    color: "from-pink-400 to-rose-500"
  },
  { 
    label: "DSA", 
    href: "/dashboard/questions", 
    icon: Code2,
    description: "Data Structures & Algorithms",
    color: "from-purple-400 to-indigo-500"
  },
  { 
    label: "Resume", 
    href: "/dashboard/upgrade", 
    icon: FileText,
    description: "Resume Builder",
    color: "from-cyan-400 to-blue-500"
  },
    { 
    label: "SQL", 
    href: "/dashboard/sql", 
    icon: Database,
    description: "SQL Interview Practice",
    color: "from-blue-400 to-cyan-500"
  },
  { 
    label: "NoteDeck", 
    href: "/dashboard/extrafeatures", 
    icon: StickyNote,
    description: "Smart Note Taking",
    color: "from-orange-400 to-red-500"
  },
  { 
    label: "How it Works?", 
    href: "/dashboard/howitworks", 
    icon: HelpCircle,
    description: "Learn the Process",
    color: "from-emerald-400 to-teal-500"
  },
];

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);

  useEffect(() => {
    // Sparkle animation every 3 seconds
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 3000);

    return () => {
      clearInterval(sparkleInterval);
    };
  }, []);

  // Navigation handler for notification bell
  const handleNotificationClick = () => {
    router.push("/dashboard/code-builder");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-50 via-purple-50 via-blue-50 to-cyan-50 backdrop-blur-lg border-b-2 border-gradient-to-r from-pink-200 to-purple-200 shadow-2xl">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-2 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-4 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1 right-40 w-2 h-2 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <Link 
              href="/dashboard" 
              className="flex items-center group transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-30 group-hover:opacity-50 blur-lg transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-3 rounded-2xl shadow-xl transform group-hover:rotate-12 transition-all duration-300">
                  <Image
                    src="/logo.svg"
                    width={28}
                    height={28}
                    alt="PersonaIQ"
                    className="w-7 h-7 text-white filter drop-shadow-lg"
                  />
                  {sparkleAnimation && (
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="ml-4">
                <div className="flex items-center gap-2">
                  <span className="font-black text-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    PersonaIQ
                  </span>
                  <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
                </div>
                <div className="flex items-center gap-1 -mt-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Cute Interview Prep ✨
                  </span>
                  <Star className="w-3 h-3 text-yellow-400" />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center bg-white/80 backdrop-blur-lg rounded-3xl px-2 py-2 shadow-2xl border-2 border-white/50 max-w-4xl">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = path === item.href;
                  
                  return (
                    <div key={item.href} className="relative group">
                      <Link
                        href={item.href}
                        className={`relative flex items-center gap-1.5 px-3 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                          isActive
                            ? `bg-gradient-to-r ${item.color} text-white shadow-xl scale-105`
                            : "text-gray-600 hover:bg-white/70 hover:shadow-md"
                        }`}
                      >
                        <div className={`p-1 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gradient-to-br ' + item.color} ${!isActive && 'text-white'}`}>
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                        </div>
                        <span className="font-semibold text-xs whitespace-nowrap">{item.label}</span>
                        
                        {isActive && (
                          <>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce flex items-center justify-center">
                              <span className="text-xs">✨</span>
                            </div>
                            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full opacity-70"></div>
                          </>
                        )}
                      </Link>
                      
                      {/* Compact tooltip */}
                      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
                        <div className={`bg-gradient-to-r ${item.color} text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap`}>
                          {item.description} 💖
                          <div className={`absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r ${item.color} rotate-45`}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* Right Section */}
            <div className="hidden lg:flex items-center gap-3">
              <button 
                className="relative group"
                onClick={() => router.push('/dashboard/sql')}
              >
                <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-3 rounded-2xl border-2 border-pink-200 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <Bell className="w-5 h-5 text-pink-600 group-hover:animate-swing" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              </button>

              {/* Cute Notifications - Updated with Navigation */}
              <button 
                onClick={handleNotificationClick}
                className="relative group transform hover:scale-110 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-3 rounded-2xl border-2 border-pink-200 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                <Wand2 className="w-5 h-5 text-pink-600 group-hover:animate-swing" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                
                {/* Tooltip for Code Builder */}
                <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-semibold px-4 py-2 rounded-2xl shadow-lg whitespace-nowrap">
                    AI Code Builder ✨
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-pink-500 to-rose-500 rotate-45"></div>
                  </div>
                </div>
              </button>

              {/* Super Cute User Button */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-30 group-hover:opacity-60 blur-lg transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-pink-200 to-purple-200 p-2 rounded-full border-3 border-white shadow-xl">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-full border-2 border-white shadow-lg transform group-hover:scale-110 transition-all duration-300"
                      }
                    }}
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-2xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200 text-pink-600 hover:from-pink-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-110"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Super Cute Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)}></div>
          
          <div className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-pink-200 p-6 max-h-[80vh] overflow-y-auto">
            {/* Mobile Notifications */}
            <div className="flex items-center justify-center mb-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
              <button 
                onClick={handleNotificationClick}
                className="relative"
              >
                <div className="p-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-xl">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = path === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-xl`
                        : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 hover:from-pink-50 hover:to-purple-50"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${isActive ? 'bg-white/20' : 'bg-gradient-to-br ' + item.color}`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold flex items-center gap-2">
                        {item.label}
                        {isActive && <span className="text-yellow-300">✨</span>}
                      </div>
                      <div className={`text-sm ${isActive ? "text-white/80" : "text-gray-500"}`}>
                        {item.description} 💖
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Mobile Code Builder Button */}
            <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
              <button
                onClick={() => {
                  handleNotificationClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="p-2 bg-white/20 rounded-xl">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-bold flex items-center gap-2">
                    AI Code Builder ✨
                    <Star className="w-4 h-4 text-yellow-300" />
                  </div>
                  <div className="text-sm text-white/80">
                    Build code step by step 🚀
                  </div>
                </div>
              </button>
            </div>
            
            {/* Mobile User Section */}
            <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <UserButton />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 flex items-center gap-2">
                    Your Account <Heart className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-sm text-gray-600">Manage your cute profile ✨</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        .animate-swing {
          animation: swing 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Header;