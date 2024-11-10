import React from 'react';
import { PageContent } from '../../types/models';
import { Settings, BookOpen, GraduationCap, BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarProps {
  pages: PageContent[];
  currentPage: PageContent | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ pages, currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex h-full flex-col gap-6 py-4 text-white/90">
      <div className="px-2">
        <div className="mb-6 space-y-4">
          <div className="px-4">
            <h2 className="text-lg font-semibold tracking-tight text-white">
              Learning Path
            </h2>
            <p className="text-sm text-white/60">Master your journey</p>
          </div>
          <div className="space-y-2">
            <Button
              variant="secondary"
              size="lg"
              className={cn(
                'w-full justify-start bg-white/10 text-white hover:bg-white/20',
                location.pathname === '/' && 'bg-white/20'
              )}
              onClick={() => navigate('/')}
            >
              <GraduationCap className="mr-3 h-5 w-5" />
              <div className="flex flex-col items-start">
                <span>Start Learning</span>
                <span className="text-xs text-white/60">
                  Begin your journey
                </span>
              </div>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className={cn(
                'w-full justify-start text-white hover:bg-white/10',
                location.pathname === '/progress' && 'bg-white/10'
              )}
              onClick={() => navigate('/progress')}
            >
              <BookOpenCheck className="mr-3 h-5 w-5" />
              <div className="flex flex-col items-start">
                <span>My Progress</span>
                <span className="text-xs text-white/60">
                  Track your learning
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="mx-4 bg-white/10" />

      <div className="flex-1 px-2">
        <h3 className="mb-4 px-4 text-sm font-semibold text-white/60">
          Course Modules
        </h3>
        <div className="space-y-1 px-2">
          {pages.map((page) => (
            <Button
              key={page.sequence}
              variant={
                currentPage?.sequence === page.sequence ? 'secondary' : 'ghost'
              }
              className={cn(
                'w-full justify-start font-normal text-white',
                currentPage?.sequence === page.sequence
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              )}
              size="sm"
              onClick={() => navigate(`/course/${page.sequence}`)}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs font-medium">
                  {page.sequence}
                </span>
                <span className="truncate">{page.title}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto px-4">
        <Separator className="my-4 bg-white/10" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="w-full justify-start text-white hover:bg-white/10"
            >
              <Settings className="mr-3 h-5 w-5" />
              <span>Settings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span>Profile Settings</span>
                <span className="text-xs text-muted-foreground">
                  Manage your account
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span>Preferences</span>
                <span className="text-xs text-muted-foreground">
                  Customize your experience
                </span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col">
                <span>Help & Support</span>
                <span className="text-xs text-muted-foreground">
                  Get assistance
                </span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
