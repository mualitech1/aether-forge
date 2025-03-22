import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiHome, FiSearch, FiClipboard, FiSettings, FiUser, FiCpu } from 'react-icons/fi';

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const isActive = (path: string) => {
    return router.pathname === path;
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link 
              href="/" 
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-aether-primary to-aether-accent flex items-center justify-center">
                <span className="text-white font-bold text-sm">AF</span>
              </div>
              <span className="font-bold text-xl hidden md:inline-block">AetherForge</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/web-scraping-agent" 
              className={`text-sm font-medium transition-colors ${
                isActive('/web-scraping-agent') 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Web Scraping Agent
            </Link>
            <Link 
              href="/scrape" 
              className={`text-sm font-medium transition-colors ${
                isActive('/scrape') 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Scrape
            </Link>
            <Link 
              href="/results" 
              className={`text-sm font-medium transition-colors ${
                isActive('/results') 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Results
            </Link>
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dashboard
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <FiUser className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-border bg-background py-2">
        <div className="grid grid-cols-5 gap-1">
          <Link 
            href="/" 
            className={`flex flex-col items-center justify-center p-2 ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <FiHome className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          
          <Link 
            href="/web-scraping-agent" 
            className={`flex flex-col items-center justify-center p-2 ${
              isActive('/web-scraping-agent') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <FiCpu className="w-5 h-5" />
            <span className="text-xs mt-1">Agent</span>
          </Link>
          
          <Link 
            href="/scrape" 
            className={`flex flex-col items-center justify-center p-2 ${
              isActive('/scrape') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <FiSearch className="w-5 h-5" />
            <span className="text-xs mt-1">Scrape</span>
          </Link>
          
          <Link 
            href="/results" 
            className={`flex flex-col items-center justify-center p-2 ${
              isActive('/results') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <FiClipboard className="w-5 h-5" />
            <span className="text-xs mt-1">Results</span>
          </Link>
          
          <Link 
            href="/dashboard" 
            className={`flex flex-col items-center justify-center p-2 ${
              isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <FiSettings className="w-5 h-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container px-4 md:px-6 pb-16 md:pb-10 pt-6 md:pt-10">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/40">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-6 px-4 md:px-6 text-sm">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} AetherForge by Muhammed Ali. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/privacy" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link 
              href="/contact" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 