export interface ICourse {
  containsLockedLessons: boolean;
  description: string;
  duration: number;
  id: string;
  launchDate: string;
  lessonsCount: number;
  previewImageLink: string;
  rating: number;
  status: string;
  tags: string[];
  title: string;
  meta: {
    skills?: string[];
    courseVideoPreview?: {
      duration: number;
      link: string;
      previewImageLink: string;
    };
  };
}
