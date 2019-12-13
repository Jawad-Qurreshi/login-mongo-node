import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/sdk/custom/user.service' ;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private router: Router,private formBuilder: FormBuilder,private userService:UserService ) {}
  loginForm: FormGroup;
  loading : boolean;
  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  save() {
    const loginData = this.loginForm.value;
    console.log('loginData', loginData);
    // we need to send this data to our node.js server

    this.userService.userLogin(loginData).subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
        this.router.navigateByUrl('/home');
      },
      error => {
        this.loading = false;
        console.log('error in login save method', error);
        this.router.navigateByUrl('/register');
      }
    );
  }

}