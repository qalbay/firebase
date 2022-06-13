import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesComponent } from './employees.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent
  },
  {
    path: 'add',
    component: AddEmployeeComponent
  },
  {
    path: 'add/:id',
    component: AddEmployeeComponent
  },
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
