export interface Login {
  message: string;
  data: Data;
}

export interface Data {
  token: string;
  userId: number;
}