import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // baseUrl = 'http://localhost:5000/api/v1/';
  // baseUrl = 'https://m4-mini-crm.herokuapp.com/api/v1';
  baseUrl = 'http://165.227.219.173:5700/api/v1/';
  token: string;

  header: HttpHeaders;
  headerFile: HttpHeaders;
  headerNoAuth: HttpHeaders;

  constructor(
    private http: HttpClient,
  ) {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: this.token
    });
    this.headerFile = new HttpHeaders({
      Authorization: this.token,
    });

    this.headerNoAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
   }

  postRequestNoAuth(url, data) {
    return this.http.post(`${this.baseUrl + url}`, data, { headers: this.headerNoAuth });
  }

  getRequest(url) {
    return this.http.get(`${this.baseUrl + url}`, { headers: this.header });
  }

  postRequest(url, data) {
    return this.http.post(`${this.baseUrl + url}`, data, { headers: this.header });
  }

  putRequest(url, data) {
    return this.http.put(`${this.baseUrl + url}`, data, { headers: this.header });
  }

  deleteRequest(deleteUrl) {
    return this.http.delete(`${this.baseUrl}${deleteUrl}`, { headers: this.header }).toPromise();
  }

}
