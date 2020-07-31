import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { Validators, FormBuilder, FormGroup, FormControl, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/misc/snackbar.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

AdminListArr: any;
adminForm: FormGroup;
submitted = false;
isVisible = true;
isDelete = true;
dtOptions: any = {};
deleteId: any;

constructor(
  private fb: FormBuilder,
  private snackBar: SnackbarService,
  public orgService: AdminService,
  private router: Router
) {
  
}

  ngOnInit(): void {

    this.adminForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      contact: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      password: new FormControl('admin'),
      type: new FormControl(1),
      address: new FormControl('')
    });

    this.getAdmins();
  }

  getAdmins(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // visible :true
    };
    this.dtOptions = this.orgService.getAdminList().subscribe(res => {
      // console.log(res.data);
      this.AdminListArr = res.data;
    });
  }

  reset(){
    this.formDirective.resetForm();
    this.isVisible = true;
  }

  onDeletePopup(id){
    this.isDelete = true;
    this.deleteId = id;
  }

  onEditPopup(data: any){
    this.isVisible = true;
    // this.adminForm.controls.id.setValue(data._id);
    // this.adminForm.controls.name.setValue(data.name);
    // this.adminForm.controls.email.setValue(data.email);
    // this.adminForm.controls.contact.setValue(data.contact);
    // this.adminForm.controls.address.setValue(data.address);

    this.adminForm.patchValue({
      id: data._id,
      name: data.name,
      email: data.email,
      contact: data.contact,
      password: data.password,
      type: data.type,
      address: data.address
    });

  }

  // use in validation return controls
  get f() { return this.adminForm.controls; }

  onSubmit(data){
    this.submitted = true;
    if (this.adminForm.invalid) {
      return this.snackBar.error('Form Invalid');
    }

    if(!data.id){
      data.password = "admin";
      data.type = 1;
      this.orgService.saveAdminForm(data).subscribe( res => {
        if(res.status === 'success'){
          this.snackBar.success(res.message);
          this.getAdmins();
        }else{
          this.snackBar.error('Admin Not Created.');
        }
        this.adminForm.reset();
        this.isVisible = false;
      });

    }else{
      data._id = data.id;
      this.orgService.updateAdmins(data.id, data).subscribe(res => {
        if(res.status === 'success'){
          this.snackBar.success(res.message);
          this.getAdmins();
        }else{
          this.snackBar.error('Admin Not Update.');
        }
        this.isVisible = false;
        this.adminForm.reset();
      });

    }
    // setTimeout(() => {
    //   this.isVisible = true;
    // }, 2000);
  }

  onDelete()  {
    const id = this.deleteId;
    this.isDelete = false;
    this.orgService.deleteAdmins(id).subscribe(res => {
      if(res.status === 'success'){
        this.snackBar.success(res.message);
        this.getAdmins();
      }else{
        this.snackBar.error('Admin Not Deleted.');
      }
      this.isDelete = false;
    });

    // setTimeout(() => {
    //   this.isVisible = true;
    // }, 2000);
  }


}
