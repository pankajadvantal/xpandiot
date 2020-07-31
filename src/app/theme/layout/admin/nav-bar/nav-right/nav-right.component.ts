import {Component, OnInit, ElementRef} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/misc/snackbar.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/auth/login.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  changePasswordForm: FormGroup;
  username: string;
  useremail: any;
  isVisible = true;
  constructor(
    private router: Router,
    private snackBar: SnackbarService,
    private loginService: LoginService,
  ) {
   }

  ngOnInit() {

    this.changePasswordForm = new FormGroup({
      current_password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required)
    });

    const users = this.loginService.getUsersData();
    this.username = users.name;
    this.useremail = users.email;
  }

  changePassword(form: any){
    if (!form.current_password){
      return this.snackBar.error('Please Enter Current Password !');
    }
    if (!form.new_password){
      return this.snackBar.error('Please Enter New Password !');
    }
    if (!form.confirm_password){
      return this.snackBar.error('Please Enter Confirm Password !');
    }
    if (form.new_password !== form.confirm_password){
      return this.snackBar.error('Confirm Password not match !');
    }
    const data = {
      email: this.useremail,
      password: form.current_password,
      new_password: form.new_password,
    };
    this.loginService.changePassword(data).subscribe(res => {
      if (res.status === 'success'){
        this.snackBar.success(res.message);
      }
      this.resetPasswordForm();
    });
  }

  resetPasswordForm(){
    this.changePasswordForm.reset();
    this.isVisible = false;
  }

  logout(){
    this.loginService.logout().subscribe( res => {
      if(res.status === 'success'){
        this.snackBar.success('Logout Successful');
        localStorage.removeItem('token');
        localStorage.removeItem('users');
        this.router.navigateByUrl('/');
      }
    });
  }
}
