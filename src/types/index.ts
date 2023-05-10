export interface MenuItem {
  icon: string;
  text: string;
  route: string;
}

export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
  result: boolean;
  errors: Array<string>;
}
