import React from 'react';
import { Card } from '@/components/ui/card';
import { Loader } from 'lucide-react';

interface GifPreviewProps {
  gifUrl?: string;
}

export const GifPreview: React.FC<GifPreviewProps> = ({ gifUrl }) => {
  const [loading, setLoading] = React.useState(true);

  if (!gifUrl) return null;

  return (
    <Card className="m-1 overflow-hidden glass-card rounded-xl">
      <div className="relative aspect-video">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#CAD8E5]">
            <Loader className="h-4 w-6 animate-spin text-[#232425]" />
          </div>
        )}
        <img
          src={gifUrl}
          alt="Topic Preview"
          className="w-full h-full object-cover"
          onLoad={() => setLoading(false)}
          style={{ display: loading ? 'none' : 'block' }}
        />
      </div>
    </Card>
  );
};
