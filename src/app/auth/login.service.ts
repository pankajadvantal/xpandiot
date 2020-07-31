import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  // noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  login(authCredentials) {
    return this.http.post(env.baseUrl + 'authenticate', authCredentials).pipe(map((res: any) => {
      return res;
    }));
  }

  changePassword(data) {
    return this.http.post(env.baseUrl + 'changePassword', data).pipe(map((res: any) => {
      return res;
    }));
  }

    //Helper Methods

    setToken(token: string) {
      localStorage.setItem('token', token);
    }
  
    getToken() {
      return localStorage.getItem('token');
    }
  
    deleteToken() {
      localStorage.removeItem('token');
    }
  
    getUserPayload() {
      const token = this.getToken();
      if (token) {
        const userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }
      else
        return null;
    }
  
    isLoggedIn() {
      const userPayload = this.getUserPayload();
      if (userPayload)
        return userPayload.exp > Date.now() / 1000;
      else
        return false;
    }

    setUsersData(data: any) {
      localStorage.setItem('users', JSON.stringify(data));
    }

    getUsersData() {
      const u = localStorage.getItem('users');
      return JSON.parse(u);
    }

    logout() {
      const getData = this.getUsersData();
      const id = getData.id;
      const data = getData;
      return this.http.put(env.baseUrl + 'logout/' + id, data).pipe(map((res: any) => {
        return res;
      }));
    }

}
