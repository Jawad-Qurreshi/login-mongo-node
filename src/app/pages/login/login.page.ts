import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/sdk/custom/user.service' ;
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private router: Router,private formBuilder: FormBuilder,private userService:UserService ) {}
  loginForm: FormGroup;
  loading : boolean;
  private toastService: ToastService
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
    if (this.loginForm.value)
    {
    const loginData = this.loginForm.value;
    console.log('loginData', loginData);
    // we need to send this data to our node.js server
    this.userService.userLogin(loginData).subscribe(
      (data: any) => {
        if (data.userData){
          console.log('got response from server', data);
        this.loading = false;
        this.router.navigateByUrl('/home');
        }else {
          this.toastService.presentToast('Incorrect username and password.');
        }
      },
      (error:any) => {
        this.loading = false;
        console.log('error in login save method', error);
        this.router.navigateByUrl('/register');
      }
    );
    }
    else{
      this.toastService.presentToast(
        'Please enter username or password.'
        );
    }
  }

}