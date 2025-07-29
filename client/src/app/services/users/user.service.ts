import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  registerUser(userData : any) {
    return this.http.post('http://localhost:5000/api/register', userData, { withCredentials: true })
  }

  loginUser(userData : any) {
    return this.http.post('http://localhost:5000/api/login', userData,    { withCredentials: true })
  }
}
