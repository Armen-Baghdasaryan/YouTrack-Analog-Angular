import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  // token$!: Observable<string | undefined>;
  currentUser!: CurrentUser;
  token!: string | null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.authService.getToken()
    this.currentUser = this.authService.getCurrentUser()

    if (this.currentUser !== undefined && this.currentUser?.token !== this.token) {
      alert('Ooops! Хитрый какой )))')
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.router.navigate(['login'])
    }
  }

  checkUser() {
    console.log(this.currentUser)
  }
}
