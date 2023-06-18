import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  token$!: Observable<string | undefined>;
  currentUser$!: Observable<string | undefined>;

  constructor(private authService: AuthService, private router: Router,) {}

  submitLogin() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['admin/projects']),
      error: (err) => alert(err.message)
    });
  }

  submitRegister() {
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        // console.log(data);
      },
      (err) => console.error(err)
    );
  }

  handleCheck() {
    this.token$.subscribe((token) => console.log('token: ', token));
    this.currentUser$.subscribe((uid) => console.log('uid: ', uid));
  }


  ngOnInit(): void {
    this.token$ = this.authService.token$;
    this.currentUser$ = this.authService.currentUser$

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        //  Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      ]),
    });

    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        //  Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      ]),
    });
  }
}
