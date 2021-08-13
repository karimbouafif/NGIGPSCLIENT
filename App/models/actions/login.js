export interface ILoginRequestState {
  type: String;
  email: string;
  password: string;
}

interface IResponse {
  user: {};
}

export interface ILoginResponseState {
  type: String;
  response: IResponse;
  user:{}
}
