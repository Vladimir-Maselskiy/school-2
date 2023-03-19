import { useState, useEffect, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Course } from './pages/Course/Course';
import { Home } from './component/Home/Home';
import { fetchCoursesData } from './utils/fetchCoursesData';
import { ICoursePrev } from './interfaces/interfaces';
import { getToken } from './utils/getToken';
import previewCoursesSaved from './data/previewCourses.json';

import './App.css';

function App() {
  const [courses, setCourses] = useState<ICoursePrev[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      setTimeout(async () => {
        const data = await fetchCoursesData(token);

        if (data) {
          setCourses(data.courses);
        } else {
          // set data from local json, because server cors policy
          setCourses(previewCoursesSaved.courses);
        }
      }, 1000);
    };
    fetchData();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home courses={courses} />}></Route>
      <Route path="/:currentCourse" element={<Course />}></Route>
    </Routes>
  );
}
export default App;
