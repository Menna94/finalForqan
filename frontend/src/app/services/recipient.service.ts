import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipientService {
  api: string = '/api/v1';
  constructor(private http: HttpClient) {}
  getAllRecipients() {
    return this.http.get(`${this.api}/recipients`);
  }
  getRecipient(id: number) {
    return this.http.get(`${this.api}/recipients/${id}`);
  }
  addRecipient(body: any) {
    return this.http.post(`${this.api}/recipients`, body);
  }
  deleteRecipient(id: number) {
    return this.http.delete(`${this.api}/recipients/${id}`);
  }
  editRecipient(id: number, body: any) {
    return this.http.put(`${this.api}/recipients/${id}`, body);
  }
}
