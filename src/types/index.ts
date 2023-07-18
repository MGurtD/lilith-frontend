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
