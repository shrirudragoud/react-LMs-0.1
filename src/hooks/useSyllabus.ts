import { useState, useEffect } from 'react';
import { SyllabusItem } from '../types/models';
import { api } from '../api/endpoints';

export const useSyllabus = () => {
  const [syllabus, setSyllabus] = useState<SyllabusItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSyllabus = async () => {
      try {
        setLoading(true);
        const data = await api.getSyllabus();
        setSyllabus(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch syllabus');
      } finally {
        setLoading(false);
      }
    };

    fetchSyllabus();
  }, []);

  return { syllabus, loading, error };
};