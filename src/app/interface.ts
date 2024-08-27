export interface ToDoItems {
  id: string;
  name: string;
  status: string;
}

export interface Tabs {
  id: string;
  name: string;
  path: string;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface UserPage {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
