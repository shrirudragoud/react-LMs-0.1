import React from 'react';
import { PageContent } from '../../types/models';
import {
  ChevronLeft,
  ChevronRight,
  Loader,
  Pause,
  Play,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface MainContentProps {
  page: PageContent | null;
  content: string;
  loading: boolean;
  error: string | null;
  onNext: () => void;
  onPrevious: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  page,
  content,
  loading,
  error,
  onNext,
  onPrevious,
}) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (iframeRef.current && content) {
      const iframe = iframeRef.current;
      const blob = new Blob([content], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      iframe.src = blobUrl;
      return () => URL.revokeObjectURL(blobUrl);
    }
  }, [content]);

  React.useEffect(() => {
    let audio: HTMLAudioElement | null = null;

    const setupAudio = () => {
      if (page?.audioUrl) {
        audio = new Audio(page.audioUrl);
        audio.addEventListener('ended', () => setIsPlaying(false));
        audio.addEventListener('error', () => setIsPlaying(false));
        audioRef.current = audio;

        audio.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      }
    };

    setupAudio();

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('ended', () => setIsPlaying(false));
        audio.removeEventListener('error', () => setIsPlaying(false));
      }
      audioRef.current = null;
      setIsPlaying(false);
    };
  }, [page]);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      iframeRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="p-8 glass-card">
          <Loader className="h-8 w-8 animate-spin text-[#232425]" />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Card className="max-w-md p-8 glass-card">
          <h3 className="text-lg font-semibold text-red-600">
            Error Loading Content
          </h3>
          <p className="mt-2 text-red-500">{error}</p>
        </Card>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="max-w-md p-8 glass-card">
          <p className="text-[#232425]/60">
            Select a topic to begin your learning journey
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col glass-card rounded-2xl">
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#CAD8E5]/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#232425] dark:text-white">
              {page.title}
            </h1>
            {page.description && (
              <p className="mt-2 text-[#232425]/60 dark:text-white/60">
                {page.description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="container max-w-[1200px] mx-auto">
          <Card className="overflow-hidden glass-card relative">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/80 hover:bg-white shadow-lg"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            <iframe
              ref={iframeRef}
              className="w-full min-h-[600px]"
              sandbox="allow-same-origin allow-scripts"
              title={page.title}
            />
          </Card>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="border-t border-[#CAD8E5]/20 p-6">
        <div className="container max-w-[1200px] mx-auto flex items-center justify-between">
          <Button
            onClick={onPrevious}
            variant="outline"
            className="glass-card hover:bg-[#CAD8E5]/20"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {page.audioUrl && (
            <Button
              onClick={toggleAudio}
              variant="outline"
              size="icon"
              className={cn(
                'rounded-full w-12 h-12',
                isPlaying ? 'bg-[#232425] text-white' : 'glass-card'
              )}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          )}

          <Button
            onClick={onNext}
            className="bg-[#232425] text-white hover:bg-[#1E1E1D]"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
