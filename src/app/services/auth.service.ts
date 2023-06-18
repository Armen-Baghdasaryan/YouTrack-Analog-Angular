import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<
    string | undefined
  >('');
  token$ = this.tokenSubject.asObservable();

  private currentUserIdSubject: BehaviorSubject<string | undefined> =
    new BehaviorSubject<string | undefined>('');
  currentUser$ = this.currentUserIdSubject.asObservable();

  constructor(private auth: AngularFireAuth, private router: Router ) {}

  signIn(params: SignIn): Observable<any> {

    return from(
      this.auth
        .signInWithEmailAndPassword(params.email, params.password)
        .then((data) => {
          this.currentUserIdSubject.next(data?.user?.uid);
          this.tokenSubject.next(data?.user?.refreshToken);
          this.setToken(data?.user?.refreshToken);
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

  // login(): Observable<string | boolean> {
  //   if (this.token$) {
  //     this.setToken(this.token$);
  //     return of(true);
  //   }

  //   return throwError(() => new Error('Failed Login'));
  // }

  logout() {
    // localStorage.removeItem('token') in Guards
    this.router.navigate(['login']);
  }
}

interface SignIn {
  email: string;
  password: string;
}
