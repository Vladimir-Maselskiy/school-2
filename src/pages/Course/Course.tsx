import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Space, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import ReactHlsPlayer from 'react-hls-player/dist';
import { ICourseCurrent, ILesson } from '../../interfaces/interfaces';
import { getMenuItemCourse, MenuItem } from '../../utils/getMenuItemCourse';
import { fetchCurrentCourse } from '../../utils/fetchCurrentCourse';

const { Content, Footer, Sider } = Layout;

export const Course = () => {
  const { currentCourse } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<ICourseCurrent>();
  const [lesson, setLesson] = useState<ILesson>();
  const [currentVideo, setCurrentVideo] = useState('');

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

  const onBackCkick = () => {
    navigate(-1);
  };

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
            cursor: 'pointer',
          }}
          onClick={onBackCkick}
        >
          {'<Back'}
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
          <Breadcrumb
            items={[
              {
                title: course?.title,
              },
              {
                title: lesson?.title,
              },
            ]}
            style={{ margin: '16px 0 16px 24px' }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Space size="large" align="center">
              <ReactHlsPlayer
                playerRef={playerRef}
                src={currentVideo}
                controls={true}
                width="50%"
                height="auto"
                hlsConfig={{}}
                style={{ marginLeft: '100px' }}
              />
            </Space>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          School - 2.0 ©2023 Created
        </Footer>
      </Layout>
    </Layout>
  );
};
