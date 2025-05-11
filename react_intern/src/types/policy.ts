export interface Policy {
  title: string;
  lastUpdate: string;
  description: string;
  questions: string[];
  contentPolicy: ContentPolicy[];
  endPolicy: string[];
}
export interface ContentPolicy {
  title: string;
  description: {
    content: string;
    listContent: string[];
  }[];
  information: {
    title: string;
    description: string;
    listDescription: string[];
  }[];
}
