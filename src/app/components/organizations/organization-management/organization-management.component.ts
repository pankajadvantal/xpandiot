import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {OrgService} from '../org.service';
import { Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/misc/snackbar.service';

@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.scss']
})
export class OrganizationManagementComponent implements OnInit {
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  // dtOptions: DataTables.Settings = {};
OrgListArr: any;
orgnizationForm: FormGroup;
submitted = false;
isVisible = true;
isDelete = true;
dtOptions: any = {};
deleteId: any;

constructor(
  private fb: FormBuilder, private snackBar: SnackbarService,
  public orgService: OrgService,
  private router: Router
) {
    this.orgnizationForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      address: [''],
    });
  }

  ngOnInit() { 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      // visible :true
    };

    this.getOrg();
    // let org_id = this.data['id']
  //     if( org_id == undefined || org_id == null){
  //       console.log(org_id , 'undefined')
  //  }else{
  //    this.button = 1
  //    this.orgnizationForm.controls['org_name'].setValue(this.data.org_name)
  //    this.orgnizationForm.controls['email'].setValue(this.data.email)
  //    this.orgnizationForm.controls['address'].setValue(this.data.address)
  //    this.orgnizationForm.controls['contact'].setValue(this.data.contact)
  //  }
  }

  getOrg(){
    this.dtOptions = this.orgService.getOrgList().subscribe(res => {
      // console.log(res.data);
      this.OrgListArr = res.data;
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
    this.orgnizationForm.controls['id'].setValue(data._id);
    this.orgnizationForm.controls['name'].setValue(data.name);
    this.orgnizationForm.controls['email'].setValue(data.email);
    this.orgnizationForm.controls['contact'].setValue(data.contact);
    this.orgnizationForm.controls['address'].setValue(data.address);

  }

  /**
   * use in validation return controls
   */
  get f() { return this.orgnizationForm.controls; }

  onSubmit(data){
    this.submitted = true;
    if (this.orgnizationForm.invalid) {
      return this.snackBar.error('form invalid');
    }
    // if (this.orgnizationForm.value){
    //       this.OrgListArr.push(this.orgnizationForm.value);
    //     }
    if(!data.id){
      this.orgService.saveOrgForm(data).subscribe( res => {
        if(res.status == "success"){
          this.snackBar.success(res.message);
          this.getOrg();
        }else{
          this.snackBar.error('Organization Not Created.');
        }
        this.isVisible = false;
      })

    }else{
      this.isVisible = false;
      data._id = data.id;
      this.orgService.updateOrgFormById(data.id, data).subscribe(res => {
        if(res.status === 'success'){
          this.snackBar.success(res.message);
          this.getOrg();
        }else{
          this.snackBar.error('Organization Not Update.');
        }
      })

    }
  }

  onOrgDelete()  {
    const id = this.deleteId;
    this.isDelete = false;
    this.orgService.deleteOrgConfirm(id).subscribe(res => {
      if(res.status === 'success'){
        this.snackBar.success(res.message);
        this.getOrg();
      }else{
        this.snackBar.error('Organization Not Deleted.');
      }
      this.isDelete = false;
    });
  }


}
