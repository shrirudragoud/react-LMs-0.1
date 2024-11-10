import React from 'react';
import { PageContent } from '../types/models';
import { MainContent } from '@/components/content/MainContent';

interface CourseContentProps {
  page: PageContent | null;
  content: string;
  loading: boolean;
  error: string | null;
  onNext: () => void;
  onPrevious: () => void;
}

export const CourseContent: React.FC<CourseContentProps> = ({
  page,
  content,
  loading,
  error,
  onNext,
  onPrevious,
}) => {
  return (
    <MainContent
      page={page}
      content={content}
      loading={loading}
      error={error}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
};