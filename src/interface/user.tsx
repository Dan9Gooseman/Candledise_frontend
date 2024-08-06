export interface IUser extends ISubUser {
  message: string;
  user: ISubUser;
  token: string;
}

export interface ISubUser {
  _id: string;
  username: string;
  email: string;
  role: string;
  __v: number;
}