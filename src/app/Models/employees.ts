export interface Employees {
  message: string;
  data: Data;
}

export interface Data {
  employees: Employee[];
}

export interface Employee {
  email: string;
  id: number;
  company: number;
  firstname: string;
  lastname: string;
  phone: string;
}