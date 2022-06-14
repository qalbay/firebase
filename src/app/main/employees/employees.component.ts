import { AuthService } from './../../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Router } from '@angular/router';
import { takeWhile, take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: any = [];
  isData: boolean = true;
  search = new FormControl('')
  subject: Subject<any> = new Subject();

  // pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;

  constructor(
    private employeeService: EmployeesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getAllEmployees();

    this.searchEmployee()

    this.authService.getCurrentUser();

  }

  searchEmployee() {
    this.isData = false;
    this.employees = []
    this.search.valueChanges.pipe(debounceTime(1000))
      .subscribe((value) => {
        if (!value.length) {
          this.getAllEmployees();
          return
        }
        this.employeeService.getEmployeesBySearch(value).valueChanges().subscribe((res: any) => {
          console.log(res)
          this.employees = res;
          this.isData = true;
        })
      })
  }

  getAllEmployees() {
    this.isData = false;
    this.employees = []
    this.employeeService.getAllEmployees()
      // .pipe(
      //   take(1)
      // )
      .subscribe((res: any) => {
        console.log(res)
        this.employees = res;
        this.isData = true;
      })
  }

  editEmployee(data: any) {
    this.router.navigate(['/employees/add/' + data.id])
  }

  deleteEmployee(data: any) {
    this.employeeService.deleteEmployee(data.id)
    this.getAllEmployees();

  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllEmployees();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllEmployees();
  }

}
