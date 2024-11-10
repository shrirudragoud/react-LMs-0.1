import { useState, useEffect } from 'react';
import { BookContent, PageContent } from '../types/models';

export const useBookContent = () => {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<PageContent | null>(null);
  const [pageContent, setPageContent] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/book.json');
        if (!response.ok) throw new Error('Failed to fetch book content');
        const data: BookContent = await response.json();
        const sortedPages = data.pages.sort((a, b) => a.sequence - b.sequence);
        setPages(sortedPages);
        setCurrentPage(sortedPages[0] || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load book content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const fetchPageContent = async () => {
      if (!currentPage) return;
      
      try {
        setLoading(true);
        const response = await fetch(`/content/${currentPage.fileName}`);
        if (!response.ok) throw new Error('Failed to fetch page content');
        const content = await response.text();
        setPageContent(content);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load page content');
        setPageContent('');
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [currentPage]);

  const goToPage = (sequence: number) => {
    const page = pages.find(p => p.sequence === sequence);
    if (page) setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage) {
      const nextIndex = pages.findIndex(p => p.sequence === currentPage.sequence) + 1;
      if (nextIndex < pages.length) setCurrentPage(pages[nextIndex]);
    }
  };

  const previousPage = () => {
    if (currentPage) {
      const prevIndex = pages.findIndex(p => p.sequence === currentPage.sequence) - 1;
      if (prevIndex >= 0) setCurrentPage(pages[prevIndex]);
    }
  };

  return {
    pages,
    currentPage,
    pageContent,
    loading,
    error,
    goToPage,
    nextPage,
    previousPage,
  };
};