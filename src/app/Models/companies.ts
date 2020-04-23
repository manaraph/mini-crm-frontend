export interface Companies {
  message: string;
  data: Data;
}

export interface Data {
  companies: Company[];
}

export interface Company {
  email: string;
  id: number;
  logo: string;
  name: string;
  website: string;
}