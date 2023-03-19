import { useState, useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { List, Typography, Divider, Collapse } from 'antd';

import Card from 'antd/es/card';
import Rate from 'antd/es/rate';
import { useWindowWidth } from '../../hooks';
import { ICoursePrev } from '../../interfaces/interfaces';
import { NavLink } from 'react-router-dom';
const { Paragraph } = Typography;
const { Panel } = Collapse;

type TProps = {
  item: ICoursePrev;
};

export const CustomCard = ({ item }: TProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef(null);
  const { windowWidth } = useWindowWidth();
  const columns = Math.round(windowWidth / 320);

  const height = Math.max(windowWidth / columns - 120 - 20 * columns, 200);
  const width = Math.max(windowWidth / columns - 120 - 20 * columns, 200);

  const onMouseEnter = (e: any) => {
    setIsHovered(true);
    setTimeout(() => {
      if (playerRef.current) {
        try {
          // @ts-ignore
          playerRef.current.play();
        } catch (error) {
          console.log(error);
        }
      }
    }, 1000);
  };
  const onMouseLeave = (e: any) => {
    setIsHovered(false);
  };

  return (
    <Card
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cover={
        !isHovered ? (
          <img
            src={`${item.previewImageLink}/cover.webp`}
            alt={item.description}
            height={height}
            width={width}
          />
        ) : (
          <ReactHlsPlayer
            playerRef={playerRef}
            src={`${item.meta.courseVideoPreview?.link}`}
            autoPlay={true}
            controls={true}
            width={width}
            height={height}
          />
        )
      }

      //   title={item.title}
    >
      <NavLink to={`/${item.id}`}>
        <Paragraph style={{ minHeight: 63 }} strong>
          {item.title}
        </Paragraph>
      </NavLink>
      <Divider />
      <Paragraph>Lessons: {item.lessonsCount}</Paragraph>
      <Collapse>
        <Panel header="Skills:" key={item.id}>
          <List
            dataSource={item.meta.skills}
            renderItem={(item: string) => (
              <List.Item key={item}>
                <Paragraph>{item}</Paragraph>
              </List.Item>
            )}
          ></List>
        </Panel>
      </Collapse>

      <Rate allowHalf disabled defaultValue={item.rating} />
    </Card>
  );
};
