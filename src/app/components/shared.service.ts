import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getUsersData() {
    const u = localStorage.getItem('users');
    return JSON.parse(u);
  }

  
}
