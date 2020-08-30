import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';
import { RouterGaurd } from 'src/app/gaurds/route-gaurd';


const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: 'create',
        component: CreateProjectComponent,
        canActivate: [RouterGaurd]
      },{
        path: 'view/:id',
        component: ViewProjectComponent,
        canActivate: [RouterGaurd]
      },{
        path: 'list',
        component: ProjectListComponent,
        canActivate: [RouterGaurd]
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
