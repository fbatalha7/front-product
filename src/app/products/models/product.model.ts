export interface Department {
  id: string;
  description: string;
}

export interface Product {
  id?: string;    
  code: string;
  description: string;
  department: Department;   
  price: number;
  status: boolean;
}
