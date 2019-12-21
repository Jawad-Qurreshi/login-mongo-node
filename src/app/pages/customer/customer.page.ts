import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/sdk/custom/user.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.page.html',
  styleUrls: ['./customer.page.scss'],
  
})
export class CustomerPage implements OnInit {

  constructor(private Customerform: FormGroup, private formBuilder: FormBuilder ,private userService:UserService) {}

  //userService:UserService;
 router:Router;
  loading:boolean;

  ngOnInit() {
    this.formInitializer();
  }

  
  formInitializer() {
    this.Customerform = this.formBuilder.group({
      name: ['', [Validators.required]],
      shopname: ['', [Validators.required, Validators]],
      address: ['', [Validators.required, Validators]],
      service: ['', [Validators.required,Validators]],
      catogory: ['', [Validators.required]],
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

    this.userService.signupcustomer(this.Customerform.value).subscribe(
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