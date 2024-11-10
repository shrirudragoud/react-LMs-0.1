import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { PageContent as PageContentType } from '../../types/models';

interface PageContentProps {
  page: PageContentType;
  content: string;
  onNext: () => void;
  onPrevious: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function Component({
  page,
  content,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious,
}: PageContentProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Title */}
        <div className="border-b border-gray-200 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* GIF Preview */}
          {page.gifUrl && (
            <div className="mb-8">
              <img
                src={page.gifUrl}
                alt={page.title}
                className="rounded-xl w-full object-cover max-h-[400px]"
              />
            </div>
          )}

          {/* Description */}
          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700">{page.description}</p>
          </div>

          {/* File Content (iframe) */}
          <div className="relative mb-8">
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md z-10"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-gray-600" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <iframe
              srcDoc={content}
              className={`w-full rounded-xl border border-gray-500 ${
                isFullscreen ? 'h-[80vh]' : 'h-[50vh]'
              }`}
              title="Content Preview"
            />
          </div>

          {/* Audio Player */}
          {page.audioUrl && (
            <div className="flex items-center space-x-4 py-6 border-t border-gray-200">
              <button
                onClick={toggleAudio}
                className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <audio
                ref={audioRef}
                src={page.audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="w-full"
                controls
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-8 py-6 bg-gray-50">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`flex items-center space-x-2 px-5 py-3 rounded-lg transition-colors ${
              hasPrevious
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>
          <span className="text-sm font-medium text-gray-500">
            Page {page.sequence}
          </span>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center space-x-2 px-5 py-3 rounded-lg transition-colors ${
              hasNext
                ? 'text-blue-600 hover:bg-blue-50'
                : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
