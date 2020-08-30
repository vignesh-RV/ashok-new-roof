import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RouterGaurd } from './gaurds/route-gaurd';
import { AdminComponent } from './pages/admin/admin.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },{
    path: 'login',
    component: LoginComponent,
    canActivate: [RouterGaurd]
  },{
    path: 'register',
    component: LoginComponent
  },{
    path: 'projects',
    loadChildren: () => import('./pages/projects/projects.module').then(m => m.ProjectsModule)
  },{
    path: 'admin',
    component: AdminComponent,
    canActivate: [RouterGaurd]
  },{
    path: 'purchase',
    component: PurchaseComponent,
    canActivate: [RouterGaurd]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
