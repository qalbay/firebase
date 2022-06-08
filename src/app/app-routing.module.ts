import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [
  {
    path: 'employees',
    component: LayoutComponent,
    loadChildren: () => import('./main/employees/employees.module').then(m => m.EmployeesModule)
  },
  {
    path: "**",
    redirectTo: "/employees",
    pathMatch: "full",
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
