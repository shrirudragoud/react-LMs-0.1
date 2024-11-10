import React from 'react';
import { Book, Loader } from 'lucide-react';
import { useSyllabus } from '../../hooks/useSyllabus';
import { SyllabusItem } from '../../types/models';

interface SyllabusNavigationProps {
  onTitleSelect: (title: string) => void;
  activeTitle?: string;
}

export const SyllabusNavigation: React.FC<SyllabusNavigationProps> = ({
  onTitleSelect,
  activeTitle,
}) => {
  const { syllabus, loading, error } = useSyllabus();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader className="w-6 h-6 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <p>Error loading syllabus</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <nav className="py-4">
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Course Content</h2>
      </div>
      <ul className="space-y-1">
        {syllabus.map((item: SyllabusItem) => (
          <li key={item.title}>
            <button
              onClick={() => onTitleSelect(item.title)}
              className={`w-full px-4 py-2 flex items-center space-x-3 ${
                activeTitle === item.title
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Book className="w-5 h-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};