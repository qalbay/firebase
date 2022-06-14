import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmValidator } from './confirm-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/employees'])
    }
    this.signupFormInitialize();
  }

  signupFormInitialize() {
    this.signupForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      password: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
    },
      {
        validator: ConfirmValidator('password', 'confirm_password')
      })
  }

  signup() {
    this.authService.signup(this.signupForm.value.email, this.signupForm.value.password)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

}
