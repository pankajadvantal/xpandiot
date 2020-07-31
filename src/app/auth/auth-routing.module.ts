import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
        // pathMatch: 'prefix',
        // redirectTo: '',
    // pathMatch: 'full'
  },
  {
    path: 'reset-password',
    component: ForgotPasswordComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
