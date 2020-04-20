import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  baseUrl = 'http://localhost:5000/';
  // baseUrl = 'https://m4-mini-crm.herokuapp.com/api/v1';

  header: HttpHeaders;
  headerFile: HttpHeaders;
  headerNoAuth: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Authorization: this.token
    });
    this.headerFile = new HttpHeaders({
      // Authorization: this.token,
    });

    this.headerNoAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
   }

  postRequestNoAuth(url, data) {
    return this.http
      .post(`${this.baseUrl + url}`, data, { headers: this.headerNoAuth });
  }
}
