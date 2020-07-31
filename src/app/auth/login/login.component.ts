import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from 'src/app/theme/shared/components/toast/toast.service';
import { SnackbarService } from 'src/app/misc/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private router: Router,
    private service: LoginService,
    private http: HttpClient,
    public toastEvent: ToastService,
    public snackBar: SnackbarService
  ) { 
  }

  ngOnInit(): void {
    document.querySelector('body').classList.add('able-pro-dark');
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }); 
  }

  onLogin(data){
    if(!data.email){
      return this.snackBar.error("Please Enter Email !");
    }
    if(!data.password){
      return this.snackBar.error("Please Enter Password !");
    }
    
    this.service.login(data).subscribe((res:any) => {
      if(res.status == "success"){
        this.snackBar.success("Login Successfull.");
        this.service.setToken(res.token);
        this.service.setUsersData(res.user);
        this.router.navigate(['/dashboard']);
      }else{
        this.snackBar.error("Login unSuccessfull.");
        this.router.navigate(['/']);
      }
    })
    
  }

}
