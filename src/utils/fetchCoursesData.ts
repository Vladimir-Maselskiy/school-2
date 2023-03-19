import axios from 'axios';

export const fetchCoursesData = async (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const res = await axios.get(
      'http://api.wisey.app/api/v1/core/preview-courses',
      {
        // @ts-ignore
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.log(error.message);
  }
};
