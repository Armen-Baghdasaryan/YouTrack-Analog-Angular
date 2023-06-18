import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboradComponent } from './components/admin-dashborad/admin-dashborad.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NotFoundComponent } from '../../not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboradComponent,
    children: [
      { path: 'projects', component: ProjectsComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
