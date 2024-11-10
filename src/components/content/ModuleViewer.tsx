import React, { useRef, useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { PageContent as PageContentType } from '../../types/models';

interface ModuleViewerProps {
  page: PageContentType;
  content: string;
}

export default function ModuleViewer({ page, content }: ModuleViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const blob = new Blob([content], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);
      iframe.src = blobUrl;
      return () => URL.revokeObjectURL(blobUrl);
    }
  }, [content]);

  const handleIframeLoad = () => {
    setLoading(false);
    if (iframeRef.current) {
      const viewportHeight = window.innerHeight;
      const headerHeight = 80; // Reduced header height
      const desiredHeight = Math.max(
        viewportHeight - headerHeight,
        iframeRef.current.contentWindow?.document.documentElement
          .scrollHeight || 1200
      );
      setIframeHeight(`${desiredHeight}px`);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        const viewportHeight = window.innerHeight;
        const headerHeight = 80;
        setIframeHeight(`${viewportHeight - headerHeight}px`);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 bg-white">
      {/* Compact header */}
      <div className="border-b border-gray-100 px-4 py-2 bg-white">
        <h1 className="text-xl font-bold text-gray-900">{page.title}</h1>
        {page.description && (
          <p className="text-sm text-gray-600 truncate">{page.description}</p>
        )}
      </div>

      {/* Maximized iframe container */}
      <div className="relative h-[calc(100vh-80px)] w-screen">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <Loader className="w-16 h-16 animate-spin text-blue-600" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          style={{
            height: iframeHeight,
            minHeight: 'calc(100vh - 80px)',
            width: '150vw',
            border: 'none',
            padding: 0,
            margin: 0,
          }}
          onLoad={handleIframeLoad}
          sandbox="allow-same-origin allow-scripts"
          title={page.title}
        />
      </div>
    </div>
  );
}
