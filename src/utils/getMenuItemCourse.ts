import type { MenuProps } from 'antd';
export type MenuItem = Required<MenuProps>['items'][number];

export const getMenuItemCourse = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem => {
  const disabled = icon ? true : false;
  return {
    label,
    key,
    icon,
    disabled,
  } as MenuItem;
};
