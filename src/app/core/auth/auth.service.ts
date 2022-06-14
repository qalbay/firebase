import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) { }

  signup(email: string, password: string) {
    this.firebaseAuth.createUserWithEmailAndPassword(email, password).then((res: any) => {
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res.user))
      this.router.navigateByUrl('/employees')
      this.toastr.success('Loggedin successfully!');
    })
      .catch((error) => {
        this.toastr.error(error.message);
      })
  }
  signin(email: string, password: string) {
    this.firebaseAuth.signInWithEmailAndPassword(email, password).then((res: any) => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.user))
      this.router.navigateByUrl('/employees')
      this.toastr.success('Loggedin successfully!');
    })
      .catch((error) => {
        this.toastr.error(error.message);
      })
  }

  GoogleAuth() {
    return this.signinWithGoogle(new GoogleAuthProvider());
  }

  signinWithGoogle(provider: any) {
    {
      return this.firebaseAuth.signInWithPopup(provider).then((result) => {
        console.log(result)
        localStorage.setItem('user', JSON.stringify(result))
        this.router.navigateByUrl('/employees')
        this.toastr.success('Loggedin successfully!');
      })
        .catch((error) => {
          this.toastr.error(error);
        });
    }
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = this.firebaseAuth.onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }


    logout() {
      this.firebaseAuth.signOut();
      localStorage.clear()
    }
  }
