import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CurrentUser, SignIn } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private tokenSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
  // token$ = this.tokenSubject.asObservable();

  constructor(private auth: AngularFireAuth, private router: Router) { }

  signIn(params: SignIn): Observable<any> {

    return from(
      this.auth
        .signInWithEmailAndPassword(params.email, params.password)
        .then((data) => {

          this.setToken(data?.user?.refreshToken);

          this.setCurrentUser({
            email: data?.user?.email,
            role: `${data?.user?.email === 'admin1@gmail.com' || data?.user?.email === 'admin2@gmail.com' ? 'admin' : 'user'}`,
            uid: data?.user?.uid,
            token: data?.user?.refreshToken,
          })

          return of(true);
        })
    );
  }

  register(params: SignIn): Observable<any> {
    return from(
      this.auth.createUserWithEmailAndPassword(params.email, params.password)
    );
  }

  setToken(token: string | undefined) {
    if (token !== undefined) {
      localStorage.setItem('token', token);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setCurrentUser(user: CurrentUser) {
    localStorage.setItem('currentUser', JSON.stringify(user))
  }

  getCurrentUser() {
    const curUser = localStorage.getItem('currentUser')
    return curUser ? JSON.parse(curUser) : null
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    if (confirm('Are you sure?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.router.navigate(['login']);
    }
  }
}
