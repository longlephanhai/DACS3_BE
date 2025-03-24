export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: {
    _id: string;
    nmae: string;
  };
  phone: number;
  permissions?: {
    _id: string;
    name: string;
    apiPath: string;
    module: string
  }[]
}