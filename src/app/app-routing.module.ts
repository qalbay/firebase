import { AuthGuard } from './core/auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: 'employees',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./main/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "**",
    redirectTo: "authentication",
    pathMatch: "full",
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
