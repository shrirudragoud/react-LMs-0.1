const API_BASE_URL = 'http://localhost:3333';

export const api = {
  getContent: async (title?: string): Promise<ContentItem> => {
    const response = await fetch(
      `${API_BASE_URL}/get_content${title ? `?title=${encodeURIComponent(title)}` : ''}`
    );
    if (!response.ok) throw new Error('Failed to fetch content');
    return response.json();
  },

  getSyllabus: async (): Promise<SyllabusItem[]> => {
    const response = await fetch(`${API_BASE_URL}/get_syllabus`);
    if (!response.ok) throw new Error('Failed to fetch syllabus');
    return response.json();
  },

  getHtmlContent: (filename: string): string =>
    `${API_BASE_URL}/html_content/${filename}`
};