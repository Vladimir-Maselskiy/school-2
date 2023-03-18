export interface ICoursePrev {
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

export interface ILesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  link?: string;
  status: 'locked' | 'unlocked';
}

export interface ICourseCurrent {
  id: string;
  title: string;
  lessons: ILesson[];
}
