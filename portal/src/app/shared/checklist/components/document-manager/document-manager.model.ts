export interface DocImage {
  imageUrl: string;
  alt: string;
}

export interface DocumentManagerModel {
  title: string;
  date: string;
  page: number;
  pages: Array<DocImage>;
}
