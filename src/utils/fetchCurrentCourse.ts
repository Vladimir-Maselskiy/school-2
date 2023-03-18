import axios from 'axios';

export const fetchCurrentCourse = async (currentCourse: string) => {
  return await axios.get(
    // `http://api.wisey.app/api/v1/core/preview-courses/${currentPage}`,

    // use own proxy instead original link, because server cors policy
    `https://scrapper-fs-dev.onrender.com/api/preview-courses/${currentCourse}`
  );
};
