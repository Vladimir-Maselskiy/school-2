import axios from 'axios';

export const getToken = async () => {
  try {
    const data = await axios.get(
      'http://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions'
    );
    const token = data.data.token;
    return token;
  } catch (error: any) {
    console.log(error.message);
  }
};
