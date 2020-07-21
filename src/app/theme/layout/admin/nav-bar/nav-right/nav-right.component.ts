import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/misc/snackbar.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: SnackbarService
  ) { }

  ngOnInit() { }

  logout(){
    this.snackBar.success("Logout Successfull.");
    localStorage.removeItem("token");
    this.router.navigateByUrl("/");
  }
}
