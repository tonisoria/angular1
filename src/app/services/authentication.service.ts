import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  postCredentials(credencials: any) {
    const user: User = {
      id: 1,
      username: '',
      password: '',
    };

    const formData = new FormData();
    let obj = JSON.parse(credencials);
    formData.append('password', obj.password);
    formData.append('username', obj.username);

    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    const options = { params: new HttpParams().set('observe', 'response') };

    return this.http.post<any>(`${environment.apiUrl}/firebase/credencials`, formData, {
      observe: 'response',
      headers
    })
      .pipe(map((response) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (response.status == 200) {
          var token: string = JSON.stringify(response.body).slice(1, -1);
        } else {
          var token: string = JSON.stringify(response.body);
        }
        user.username = obj.username,
          user.password = obj.password,
          user.token = token;
        return user;
      }));
  }

  // tslint:disable-next-line: typedef
  login(username: string, password: string) {
    return this.postCredentials(JSON.stringify({ username, password })).pipe(
      map((user) => {
        if (user.token != null) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        } else {
          return null;
        }
      })
    );
  }

  // tslint:disable-next-line: typedef
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
