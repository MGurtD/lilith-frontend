export interface MenuNode {
  id: string;
  key: string;
  title: string;
  icon?: string | null;
  route?: string | null;
  sortOrder: number;
  parentId?: string | null;
  children: MenuNode[];
}

export interface UserMenuResponse {
  items: MenuNode[];
  defaultScreen?: string;
}
