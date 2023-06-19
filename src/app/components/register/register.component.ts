import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router,) { }

  submitRegister() {
    this.authService.register(this.registerForm.value).subscribe(
      (data) => {
        // console.log(data);
      },
      (err) => console.error(err)
    );
  }

  ngOnInit(): void {
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
