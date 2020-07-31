import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, EmailValidator, FormGroup } from '@angular/forms';
import { SnackbarService } from 'src/app/misc/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: any;
  constructor(
    private snackBar: SnackbarService
  ) {
    
   }

  ngOnInit(): void {
    document.querySelector('body').classList.add('able-pro-dark');
  }

  onSubmit(){
    const email = this.email;
    if(!email){
      return this.snackBar.error('Please Enter Email');
    }
    const isEmailValid = this.validateEmail(email);
    if(!isEmailValid){
      return this.snackBar.error('Please Enter Valid Email');
    }
    
    return this.snackBar.success('Email Received.');

  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

}
