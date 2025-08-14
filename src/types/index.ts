export interface GenericResponse<T> {
  result: boolean;
  errors: Array<string>;
  content?: T | null;
}

export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  result: boolean;
  errors: Array<string>;
}

export interface Region {
  id: string;
  nm: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  disabled: boolean;
  roleId: string;
  role?: Role;
}

export interface UserFilter {
  id: string;
  userId: string;
  page: string;
  key: string;
  filter: string;
}

export interface File {
  entity: string;
  entityId: string;
  type: number;
  size: number;
  originalName: string;
  path: string;
  id: string;
  createdOn: string;
  updatedOn: string;
  disabled: boolean;
}

export interface Language {
  id: string;
  code: string;
  name: string;
  icon?: string;
  isDefault: boolean;
  sortOrder?: number;
}
