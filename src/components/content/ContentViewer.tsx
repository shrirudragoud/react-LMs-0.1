import React from 'react';
import { Loader } from 'lucide-react';
import { ContentItem } from '../../types/models';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ContentViewerProps {
  content: ContentItem | null;
  loading: boolean;
  error: string | null;
}

export const ContentViewer: React.FC<ContentViewerProps> = ({
  content,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Card className="w-full h-96">
        <CardContent className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading content...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle className="font-medium">Error loading content</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!content) {
    return (
      <Card className="w-full h-96">
        <CardContent className="flex flex-col items-center justify-center h-full gap-4">
          <div className="rounded-full bg-primary/10 p-3">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">
              Select a topic from the syllabus to begin
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Choose any topic to view its content
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">{content.title}</CardTitle>
          {content.metadata?.lastUpdated && (
            <Badge variant="secondary" className="text-xs">
              Updated: {content.metadata.lastUpdated}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          <div className="prose max-w-none">
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>

          {content.metadata && (
            <div className="mt-8">
              <Separator className="my-4" />
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {content.metadata.author && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Author:</span>
                    <span>{content.metadata.author}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ContentViewer;
