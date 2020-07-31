import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './users/user-management/user-management.component';
import { AdminManagementComponent } from './admins/admin-management/admin-management.component';
import { OrganizationManagementComponent } from './organizations/organization-management/organization-management.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
  },
  {
    path: 'admin-management',
    component: AdminManagementComponent,
  },
  {
    path: 'org-management',
    component: OrganizationManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedComponentsRoutingModule { }
