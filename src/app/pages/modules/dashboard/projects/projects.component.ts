import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  // token$!: Observable<string | undefined>;
  projectForm!: FormGroup;
  currentUser!: CurrentUser;
  token!: string | null;
  projects!: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.token = this.authService.getToken();
    this.currentUser = this.authService.getCurrentUser();

    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data
    });

    this.projectsService.getProject('WillSkill').subscribe((data) => {
      console.log(data);
    });

    this.projectForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        //  Validators.email
      ]),
      description: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
    });

    if (
      this.currentUser !== undefined &&
      this.currentUser?.token !== this.token
    ) {
      alert('Ooops! Хитрый какой )))');
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.router.navigate(['login']);
    }
  }

  serializeProject(project: any): string {
    const serializedProject = JSON.stringify(project);
    return btoa(serializedProject); // Кодирование в base64
  }

  createProject() {
    this.projectsService.createProject(this.projectForm.value);
  }

  onFileChange(event: any) {
    this.projectsService.onFileChange(event);
  }
}
