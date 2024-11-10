import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Sidebar } from './components/layout/Sidebar';
import { ChatPanel } from './components/chat/ChatPanel';
import { GifPreview } from './components/content/GifPreview';
import { useBookContent } from './hooks/useBookContent';
import { HomePage } from './pages/HomePage';
import { ProgressPage } from './pages/ProgressPage';
import { CourseContent } from './pages/CourseContent';
import { useLocation } from 'react-router-dom';

function App() {
  const {
    pages,
    currentPage,
    pageContent,
    loading,
    error,
    nextPage,
    previousPage,
  } = useBookContent();

  const location = useLocation();
  const isCourseContent = location.pathname.startsWith('/course');
  const [isChatExpanded, setIsChatExpanded] = React.useState(false);

  return (
    <Layout
      sidebar={
        <Sidebar pages={pages} currentPage={currentPage} />
      }
    >
      <div className="flex h-full gap-6">
        <div className={`flex-1 min-w-0 ${!isCourseContent ? 'w-full' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route 
              path="/course/*" 
              element={
                <CourseContent
                  page={currentPage}
                  content={pageContent}
                  loading={loading}
                  error={error}
                  onNext={nextPage}
                  onPrevious={previousPage}
                />
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {isCourseContent && (
          <div className="w-80 flex flex-col gap-6">
            <div 
              className={`transition-transform duration-300 ${
                isChatExpanded ? '-translate-y-24' : 'translate-y-0'
              }`}
            >
              <GifPreview gifUrl={currentPage?.gifUrl} />
            </div>
            <ChatPanel 
              currentPageDescription={currentPage?.description} 
              onExpand={setIsChatExpanded}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;