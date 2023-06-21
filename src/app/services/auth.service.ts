import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CurrentUser } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
  token$ = this.tokenSubject.asObservable();

  private currentUserSubject: BehaviorSubject<CurrentUser | null> = new BehaviorSubject<CurrentUser | null>({})
  currentUser$ = this.currentUserSubject.asObservable()

  constructor(private auth: AngularFireAuth, private router: Router) { }

  signIn(params: SignIn): Observable<any> {

    return from(
      this.auth
        .signInWithEmailAndPassword(params.email, params.password)
        .then((data) => {
          this.tokenSubject.next(data?.user?.refreshToken);
          this.setToken(data?.user?.refreshToken);

          this.currentUserSubject.next({
            token: data?.user?.refreshToken,
            uid: data?.user?.uid,
            role: `${data?.user?.email === 'admin1@gmail.com' || data?.user?.email === 'admin2@gmail.com' ? 'admin' : 'user'}`
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

  setToken(token: any) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    // localStorage.removeItem('token') in Guards
    this.router.navigate(['login']);
  }
}

interface SignIn {
  email: string;
  password: string;
}
