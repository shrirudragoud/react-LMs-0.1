import React from 'react';
import { Menu, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen overflow-hidden gradient-bg">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full glass-effect-strong border-b border-white/10 rounded-b-lg">
        <div className="flex h-14 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 text-white hover:bg-white/10 rounded-full"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-2">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">HiveTech</h1>
              <p className="text-sm text-white/60">Modern Learning Platform</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        {sidebar && (
          <aside
            className={cn(
              'fixed left-0 top-16 h-[calc(100vh-4rem)] glass-effect border-r border-white/10 transition-all duration-300 ease-in-out z-40 rounded-r-lg',
              isSidebarOpen ? 'w-80 translate-x-0' : 'w-0 -translate-x-full'
            )}
          >
            <ScrollArea className="h-full px-4 py-4">{sidebar}</ScrollArea>
          </aside>
        )}

        {/* Main Content */}
        <main
          className={cn(
            'flex-1 transition-all duration-300 ease-in-out p-6 rounded-lg',
            isSidebarOpen ? 'ml-80' : 'ml-0'
          )}
        >
          <div className="h-[calc(100vh-4rem)] rounded-lg overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
