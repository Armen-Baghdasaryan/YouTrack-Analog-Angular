import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  token$!: Observable<string | undefined>;
  currentUser$!: Observable<CurrentUser | null>

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.token$ = this.authService.token$
    this.currentUser$ = this.authService.currentUser$
    this.token$.subscribe(token => {
      this.checkTokenAndCurrentUser(token);
    });

    this.currentUser$.subscribe(currentUser => {
      this.checkTokenAndCurrentUser(currentUser?.token);
    });

  }

  checkTokenAndCurrentUser(token: string | undefined) {
    let currentUserToken: string | undefined;

    this.currentUser$.subscribe(currentUser => {
      currentUserToken = currentUser?.token;

      if (token === currentUserToken) {
        console.log('The values are equal.');
      } else {
        console.log('The values are not equal.');
      }
    });
  }

  checkUser() {
    this.currentUser$.subscribe(user => {
      console.log(user)
    })
  }
}
