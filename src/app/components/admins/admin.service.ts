import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = env.baseUrl;
  constructor(
    private http: HttpClient
  ) {
  }

  saveAdminForm(data){
    return this.http.post(this.baseUrl + 'createAdmin', data).pipe(map((res: any) => {
      return res;
    }));
  }

  getAdminList(){
    return this.http.get(this.baseUrl + 'getAdmins').pipe(map((res: any) => {
      return res;
    }));
  }

  updateAdmins(id, data){
    return this.http.put(`${this.baseUrl}updateAdmins/${id}`, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteAdmins(id){
    return this.http.delete(`${this.baseUrl}deleteAdmins/${id}`).pipe(map((res: any) => {
      return res;
    }));
  }


}
