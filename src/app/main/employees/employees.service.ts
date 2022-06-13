import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private afs: AngularFirestore) { }

  getAllEmployees() {
    return this.afs.collection('employees').valueChanges();
  }

  addEmployee(data: any) {
    return of(this.afs.doc(`employees/${data.id}`).set(data))
  }

  getEmployeeDataById(id: any) {
    return this.afs.collection('employees', (ref) => {
      return ref.where('id', '==', +id)
    }).valueChanges()
  }

  updateEmployee(EmployeeData: any, employeeId: any) {
    this.afs.doc('employees/' + employeeId).update(EmployeeData)
  }

  deleteEmployee(employeeId: any) {
    this.afs.doc('employees/' + employeeId).delete()
  }

  getEmployeesBySearch(input:any) {
    return this.afs.collection('employees', (ref) => {
      return ref.where('first_name', '==', input)
    })
  }

}
