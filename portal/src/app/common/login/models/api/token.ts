export interface TokenUserInfoDTO {
  userId: number;
  channelCompany: string;
  sellingPointIds: number[];
  email: string;
  username: string;
  roles: string[];
  name: string;
}

export interface TokenUserDataDTO {
  iat: number;
  exp: number;
  aud: string;
  sub: string;
  userInfo: TokenUserInfoDTO;
}
