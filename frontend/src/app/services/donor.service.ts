import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  api: string = '/api/v1';

  constructor(private http: HttpClient) {}
  getAllDonors() {
    return this.http.get(`${this.api}/doners`);
  }
  getDonor(id: number) {
    return this.http.get(`${this.api}/doners/${id}`);
  }
  addDonor(body: any) {
    return this.http.post(`${this.api}/doners`, body);
  }
  deleteDonor(id: number) {
    return this.http.delete(`${this.api}/doners/${id}`);
  }
  editDonor(id: number, body: any) {
    return this.http.put(`${this.api}/doners/${id}`, body);
  }
}
