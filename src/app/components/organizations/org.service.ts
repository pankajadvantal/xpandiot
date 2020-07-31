import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  baseUrl = env.baseUrl;
  constructor(
    private http: HttpClient
  ) { 
  }

  saveOrgForm(data){
    return this.http.post(this.baseUrl + 'createOrg', data).pipe(map((res: any) => {
      return res;
    }));
  }

  getOrgList(){
    return this.http.get(this.baseUrl + 'getOrganizations').pipe(map((res: any) => {
      return res;
    }));
  }

  updateOrgFormById(id, data){
    return this.http.put(`${this.baseUrl}updateOrganizations/${id}`, data).pipe(map((res: any) => {
      return res;
    }));
  }

  deleteOrgConfirm(id){
    return this.http.delete(`${this.baseUrl}deleteOrganizations/${id}`).pipe(map((res: any) => {
      return res;
    }));
  }
  
  

}
