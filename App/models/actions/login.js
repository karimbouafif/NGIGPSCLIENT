export interface ILoginRequestState {
  type: String;
  email: string;
  password: string;
}

interface IResponse {
  user:{};
  id : string;
}

export interface ILoginResponseState {
  type: String;
  response: IResponse;
  user:{}
}
