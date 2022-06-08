import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private afs: AngularFirestore) { }

  addEmployee(data: any) {
   return this.afs.collection('employees').add(data);
  }
}
