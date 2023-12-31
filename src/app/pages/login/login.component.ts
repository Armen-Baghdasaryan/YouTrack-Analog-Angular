import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router,) { }

  submitLogin() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['dashboard/projects']),
      error: (err) => alert(err.message)
    });
  }

  ngOnInit(): void {

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

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard/projects'])
    }
  }
}
