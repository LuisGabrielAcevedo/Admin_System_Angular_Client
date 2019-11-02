export interface ChecklistResponse {
  checklist: Document[];
}

export interface Document {
  id: string;
  title: string;
  instructions: string;
  status: string;
  isRequired: boolean;
  category: string;
  links: Link;
  lastUpdate: string;
  capture: Capture;
}

export interface Capture {
  height: number;
  width: number;
  quality: number;
  orientation: string;
}

export interface Link {
  url: string;
  description: string;
}
