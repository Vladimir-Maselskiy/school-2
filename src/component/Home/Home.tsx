import { List } from 'antd';

import { useWindowWidth } from '../../hoooks';
import { ICoursePrev } from '../../interfaces/interfaces';
import { StyledHome } from './Home.styled';
import { CustomCard } from '../Card/Card';

interface IProp {
  courses: ICoursePrev[];
}

export const Home = ({ courses }: IProp) => {
  const { windowWidth } = useWindowWidth();
  const columns = Math.round(windowWidth / 320);

  return courses.length > 0 ? (
    <StyledHome>
      <List
        bordered={false}
        grid={{
          gutter: 50,
          column: columns,
        }}
        pagination={{
          pageSize: 10,
          align: 'center',
        }}
        dataSource={courses}
        renderItem={(item: ICoursePrev) => (
          <List.Item key={item.id}>
            <CustomCard item={item}></CustomCard>
          </List.Item>
        )}
      ></List>
    </StyledHome>
  ) : null;
};
