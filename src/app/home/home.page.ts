import { Component } from '@angular/core';
import {Router} from "@angular/router"
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}

  login() {
  //   const loginData = this.loginForm.value;
  //   console.log('loginData', loginData);
  //   // we need to send this data to our node.js server

  //   this.userService.userLogin(loginData).subscribe(
  //     data => {
  //       console.log('got response from server', data);
  //       this.loading = false;
  //       this.router.navigateByUrl('/home');
  //     },
  //     error => {
  //       this.loading = false;
  //       console.log('error in login save method', error);
  //       this.router.navigateByUrl('/register');
  //     }
  //   );
  this.router.navigateByUrl('/login');
   }

   SignUp() {
    //   const loginData = this.loginForm.value;
    //   console.log('loginData', loginData);
    //   // we need to send this data to our node.js server
  
    //   this.userService.userLogin(loginData).subscribe(
    //     data => {
    //       console.log('got response from server', data);
    //       this.loading = false;
    //       this.router.navigateByUrl('/home');
    //     },
    //     error => {
    //       this.loading = false;
    //       console.log('error in login save method', error);
    //       this.router.navigateByUrl('/register');
    //     }
    //   );
    this.router.navigateByUrl('/register');
     }

     CustomerSignUp(){
      this.router.navigateByUrl('/customer');
     }
}
