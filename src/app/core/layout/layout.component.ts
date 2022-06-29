import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user')!);
  userId = new FormControl('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'])
  }

  submitUserId() {
    localStorage.setItem('userId', JSON.stringify(this.userId.value))
  }

}
