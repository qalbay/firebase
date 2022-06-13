import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.signupFormInitialize();
  }

  signupFormInitialize() {
    this.signupForm = this.fb.group({
      name: new FormControl(),
      email: new FormControl(''),
      password: new FormControl(''),
      phone_number: new FormControl(''),
    })
  }

}
