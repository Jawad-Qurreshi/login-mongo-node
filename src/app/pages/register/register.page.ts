import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/sdk/custom/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  constructor(private formBuilder: FormBuilder ,private userService:UserService) {}
  registerForm: FormGroup;
  //userService:UserService;
 router:Router;
  loading:boolean;

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirm_password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          this.matchOtherValidator('password')
        ]
      ],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      institute: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }

  save() {
    this.loading = true;

    this.userService.userRegister(this.registerForm.value).subscribe(
      data => {
        console.log('got response from server', data);
        this.loading = false;
        
        this.router.navigateByUrl('/home');
      },
      error => {
        this.loading = false;
        console.log('error is', error);
      }
    );
  }

}