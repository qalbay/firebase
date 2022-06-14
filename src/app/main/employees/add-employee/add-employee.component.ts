import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, OnDestroy {
  addEmployeeForm!: FormGroup;
  employeeId: any;
  employeeData: any;
  isComponentAlive = true;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.addEmployeeFormInitialize();
    this.employeeId = this.route.snapshot.params.id;
    if (this.employeeId) {
      this.getEmployeeDataById(this.employeeId)
    }
  }

  addEmployeeFormInitialize() {
    this.addEmployeeForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: ['', Validators.required],
    })
  }

  getEmployeeDataById(employeeId: any) {
    this.employeeService.getEmployeeDataById(employeeId)
      .pipe(
        takeWhile(() => this.isComponentAlive)
      )
      .subscribe((res: any) => {
        this.employeeData = res[0];
        console.log(this.employeeData)
        this.addEmployeeForm.patchValue(this.employeeData);
      })
  }

  addEmployee() {
    const timestamp_id = new Date().getTime();
    let data = { ...this.addEmployeeForm.value, id: timestamp_id }
    this.employeeService.addEmployee(data).subscribe((res: any) => {
      console.log(res)
      this.router.navigate(['/employees'])
    })
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.addEmployeeForm.value, this.employeeId);
    this.router.navigate(['/employees'])
  }

  ngOnDestroy(): void {
    this.isComponentAlive = false;
  }



}
