import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService:EmployeesService
  ) { }

  ngOnInit() {
    this.addEmployeeFormInitialize();
  }

  addEmployeeFormInitialize() {
    this.addEmployeeForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      age: [''],
    })
  }

  addEmployee() {
    let data=this.addEmployeeForm.value
    this.employeeService.addEmployee(data).then((res:any)=>{
      console.log(res)
    })
    .catch(error =>{
      console.log(error)
    })
  }

}
