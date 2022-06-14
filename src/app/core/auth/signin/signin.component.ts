import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/employees'])
    }
    this.signinFormInitialize();

    this.authService.getCurrentUser();
  }

  signinFormInitialize() {
    this.signinForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      password: new FormControl('', [Validators.required]),
    })
  }

  signin() {
    this.authService.signin(this.signinForm.value.email, this.signinForm.value.password)
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signinForm.controls;
  }

}
