import { useState, useEffect } from 'react';
import { ContentItem } from '../types/models';
import { api } from '../api/endpoints';

export const useContent = (title?: string) => {
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const data = await api.getContent(title);
        setContent(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch content');
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchContent();
    }
  }, [title]);

  return { content, loading, error };
};