import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
})
export class ProjectItemComponent implements OnInit {
  project: any;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const serializedProject = atob(id);
      this.project = JSON.parse(serializedProject);
    }
  }

  ubdateProject() {
    this.projectService.updateProject({
      ...this.project,
      description: 'UBDATED',
      number: 'UBDATED number n777'
    }).subscribe(data => {
      this.router.navigate(['../'])
    })
  }

  deleteProject(id: string) {
    this.projectService.deleteProject(id)
    this.router.navigate(['../'])
  }
}
