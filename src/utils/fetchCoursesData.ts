import axios from 'axios';

export const fetchCoursesData = async (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const res = await axios.get(
      'http://api.wisey.app/api/v1/core/preview-courses'
    );
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
