import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/misc/snackbar.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

UserListArr: any;
userForm: FormGroup;
submitted = false;
isVisible = true;
isDelete = true;
dtOptions: any = {};
deleteId: any;

constructor(
  private fb: FormBuilder,
  private snackBar: SnackbarService,
  public orgService: UserService,
  private router: Router
) {
  this.userForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    contact: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
    password: ['user'],
    type : [0],
    address: [''],
  });
}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // visible :true
    };

    this.getUsers();
  }

  getUsers(){
    this.dtOptions = this.orgService.getUserList().subscribe(res => {
      // console.log(res.data);
      this.UserListArr = res.data;
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
    this.userForm.controls.id.setValue(data._id);
    this.userForm.controls.name.setValue(data.name);
    this.userForm.controls.email.setValue(data.email);
    this.userForm.controls.password.setValue(data.password);
    this.userForm.controls.type.setValue(data.type);
    this.userForm.controls.contact.setValue(data.contact);
    this.userForm.controls.address.setValue(data.address);

  }

  // use in validation return controls
  get f() { return this.userForm.controls; }

  onSubmit(data){
    this.submitted = true;
    if (this.userForm.invalid) {
      return this.snackBar.error('Form Invalid');
    }

    if(!data.id){
      data.password = "user";
      data.type = 0;
      this.orgService.saveUserForm(data).subscribe( res => {
        if(res.status === 'success'){
          this.snackBar.success(res.message);
          this.getUsers();
        }else{
          this.snackBar.error('User Not Created.');
        }
        this.userForm.reset();
        this.isVisible = false;
      });

    }else{

      this.isVisible = false;
      data._id = data.id;
      this.orgService.updateUsers(data.id, data).subscribe(res => {
        console.log(res);
        if(res.status === 'success'){
          this.snackBar.success(res.message);
          this.getUsers();
        }else{
          this.snackBar.error('User Not Update.');
        }
        this.userForm.reset();
      });

    }
  }

  onDelete()  {
    const id = this.deleteId;
    this.isVisible = false;
    this.orgService.deleteUsers(id).subscribe(res => {
      if(res.status === 'success'){
        this.snackBar.success(res.message);
        this.getUsers();
      }else{
        this.snackBar.error('User Not Deleted.');
      }
      this.isDelete = false;
    });
  }

}
