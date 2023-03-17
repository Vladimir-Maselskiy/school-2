// import './App.css';

import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page } from './pages/Page/Page';
// import './App.css';
import { Home } from './component/Home/Home';
import { fetchCoursesData } from './utils/fetchCoursesData';
import { ICourse } from './interfaces/interfaces';
import { getToken } from './utils/getToken';
import previewCoursesSaved from './data/previewCourses.json';

function App() {
  // const [courses, setCourses] = useState<ICourse[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = await getToken();
  //     console.log('token in app', token);
  //     // await setAuthToken(token);
  //     setTimeout(async () => {
  //       const data = await fetchCoursesData(token);
  //       console.log('data in app', data);

  //       if (data) {
  //         setCourses(data.courses);
  //       } else {
  //         setCourses(previewCoursesSaved.courses);
  //       }
  //     }, 1000);
  //   };
  //   fetchData();
  // }, []);
  return (
    <h1>hiiii</h1>
    // <Routes>
    //   <Route path="/" element={<Home courses={courses} />}></Route>
    //   <Route path="/:current" element={<Page />}></Route>
    // </Routes>
  );
}

export default App;
