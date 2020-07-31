import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsRoutingModule } from './shared-components-routing.module';
import { SharedService } from './shared.service';
import { UserManagementComponent } from './users/user-management/user-management.component';
import { SharedModule } from '../theme/shared/shared.module';
import {DataTablesModule} from 'angular-datatables';
import { AdminManagementComponent } from './admins/admin-management/admin-management.component';
import { OrganizationManagementComponent } from './organizations/organization-management/organization-management.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    UserManagementComponent,
    AdminManagementComponent,
    OrganizationManagementComponent,
  ],
  imports: [
    CommonModule,
    SharedComponentsRoutingModule,
    SharedModule,
    DataTablesModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    SharedService
  ]
})
export class SharedComponentsModule { }
