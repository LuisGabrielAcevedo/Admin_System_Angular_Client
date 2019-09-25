export interface IUser {
  _id?: string;
  email: string;
  password: string;
  userName?: string | null;
  firstName: string;
  lastName: string;
  createAt?: string | null;
  updateAt?: string | null;
  deletedAt?: string | null;
  ApplicationRole: string;
  token: string;
  role: any;
  company: any;
  application: any;
  profileImage?: any;
  isActive?: boolean;
  userConfigurations: IUserConfiguration;
  userInformation: any;
}

export interface IUserConfiguration {
  language: string;
  currentStore: string;
  paletteSelected: number;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
