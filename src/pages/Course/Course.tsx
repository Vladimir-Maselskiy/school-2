import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import ReactHlsPlayer from 'react-hls-player/dist';
import { ICourseCurrent, ILesson } from '../../interfaces/interfaces';
import { getMenuItemCourse, MenuItem } from '../../utils/getMenuItemCourse';
import { fetchCurrentCourse } from '../../utils/fetchCurrentCourse';

const { Content, Footer, Sider } = Layout;
const { Paragraph } = Typography;

export const Course = () => {
  const { currentCourse } = useParams();
  const [course, setCourse] = useState<ICourseCurrent>();
  const [lesson, setLesson] = useState<ILesson>();
  const [currentVideo, setCurrentVideo] = useState('');
  const [isAPressed, setIsAPressed] = useState(false);
  const [isSPressed, setIsSPressed] = useState(false);
  const [isXPressed, setIsXPressed] = useState(false);
  const [isCPressed, setIsCPressed] = useState(false);
  const playerRef = useRef(null);
  let items: MenuItem[] = [];

  if (course) {
    items = course?.lessons.map((lesson, index) => {
      const icon =
        lesson.status === 'locked' ? (
          <LockOutlined style={{ color: 'red' }} />
        ) : null;
      return getMenuItemCourse(lesson.title, index, icon);
    });
  }

  const ReactHlsPlayerMemo = React.memo(ReactHlsPlayer);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (playerRef.current) {
      switch (e.keyCode) {
        case 65: // A
          setIsAPressed(true);
          break;
        case 83: // S
          setIsSPressed(true);
          break;
        case 88: // X
          setIsXPressed(true);
          break;
        case 67: // C
          setIsCPressed(true);
          break;
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    switch (e.keyCode) {
      case 65: // A
        setIsAPressed(false);
        break;
      case 83: // S
        setIsSPressed(false);
        break;
      default:
        break;
      case 88: // X
        setIsXPressed(false);
        break;
      case 67: // C
        setIsCPressed(false);
        break;
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      const interval = setInterval(() => {
        // @ts-ignore
        const currentTime = playerRef.current.currentTime;
        if (currentTime > 1)
          localStorage.setItem(
            'currentLesson',
            JSON.stringify({
              course: course?.id,
              lesson: lesson?.id,
              currentTime,
            })
          );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playerRef]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (currentCourse)
      fetchCurrentCourse(currentCourse).then(res => {
        setCourse(res.data.resp);
      });
  }, [currentCourse]);

  useEffect(() => {
    if (course && course.lessons[0].link) setLesson(course.lessons[0]);
  }, [course]);

  useEffect(() => {
    if (lesson?.link) setCurrentVideo(lesson?.link);
  }, [lesson]);

  const onSelect = (e: any) => {
    setLesson(course?.lessons[+e.key]);
  };

  setTimeout(() => {
    console.log(playerRef);
  }, 5000);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width="30%">
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            textAlign: 'center',
            lineHeight: 2.0,
            overflow: 'hidden',
          }}
        >
          {course?.title}
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={['0']}
          mode="inline"
          items={items}
          onSelect={onSelect}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0 16px 24px' }}>
            <Breadcrumb.Item>{course?.title}</Breadcrumb.Item>
            <Breadcrumb.Item>{lesson?.title}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <ReactHlsPlayerMemo
              playerRef={playerRef}
              src={currentVideo}
              // autoPlay={true}
              controls={true}
              width="100%"
              height="auto"
              hlsConfig={{}}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          School - 2.0 ©2023 Created
        </Footer>
      </Layout>
    </Layout>
  );
};
