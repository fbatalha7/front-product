import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from './models/product.model';
import { environment } from '../../environment/env.development';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {
  private apiUrl = environment.apiUrlDepartment;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getDepartment(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }
}