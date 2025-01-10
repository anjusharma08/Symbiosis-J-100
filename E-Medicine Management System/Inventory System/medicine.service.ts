import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Medicine {
  id?: number;
  name: string;
  category: string;
  batch: string;
  expiryDate: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private apiUrl = 'http://localhost:8105/api/medicines'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Get all medicines
  getMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.apiUrl);
  }

  // Add new medicine
  addMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.apiUrl, medicine);
  }

  // Update medicine
  updateMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.apiUrl}/${medicine.id}`, medicine);
  }

  // Delete medicine
  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Update medicine batch number (new method)
  updateMedicineBatch(id: number, batch: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/batch`, { batch: batch });
  }
}

//observable in Angular is a way to represent data that will arrive later, like from an HTTP request

