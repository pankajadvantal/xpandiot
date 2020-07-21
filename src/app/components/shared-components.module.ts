import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsRoutingModule } from './shared-components-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { SharedModule } from '../theme/shared/shared.module';


@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    SharedComponentsRoutingModule,
    SharedModule
  ]
})
export class SharedComponentsModule { }
