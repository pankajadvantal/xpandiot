import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = env.baseUrl;
  constructor(
    private http: HttpClient
  ) {
  }

  saveUserForm(data){
    return this.http.post(this.baseUrl + 'createUser', data).pipe(map((res: any) => {
      return res;
    }));
  }

  getUserList(){
    return this.http.get(this.baseUrl + 'getUsers').pipe(map((res: any) => {
      return res;
    }));
  }

  updateUsers(id, data){
    return this.http.put(`${this.baseUrl}updateUsers/${id}`, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteUsers(id){
    return this.http.delete(`${this.baseUrl}deleteUsers/${id}`).pipe(map((res: any) => {
      return res;
    }));
  }
  
}
