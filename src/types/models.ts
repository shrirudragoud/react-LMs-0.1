export interface PageContent {
  title: string;
  fileName: string;  // HTML/TSX file name
  audioUrl?: string;
  description: string;
  gifUrl?: string;
  sequence: number;
}

export interface BookContent {
  pages: PageContent[];
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: 'success' | 'error';
}