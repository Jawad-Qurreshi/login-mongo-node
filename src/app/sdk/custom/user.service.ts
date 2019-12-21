import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BookyConfig } from '../booky.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  public userLogin(credentials: object): Observable<any> {

    // this url will be http://localhost:3000/users/login
    const url = BookyConfig.getPath() + '/login';

    return this.http.post(url, credentials);
  }

  public userRegister(credentials: object): Observable<any> {
    const url = BookyConfig.getPath() + '/signup';

    return this.http.post(url, credentials);
  }

  public signupcustomer(credentials: object): Observable<any> {

    // this url will be http://localhost:3000/users/signupcustomer
    const url = BookyConfig.getPath() + '/signupCustomer';

    return this.http.post(url, credentials);
  }
}