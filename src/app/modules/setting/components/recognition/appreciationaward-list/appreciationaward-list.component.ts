import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appreciationaward-list',
  templateUrl: './appreciationaward-list.component.html',
  styleUrls: ['./appreciationaward-list.component.css']
})
export class AppreciationawardListComponent {

  isShowPadding: any = false
  recognitionDetail: any = []
  selectAll: any = false
  page?: number = 0;
  itemsPerPage = 10;
  isShowScreenMenu: any = true;
  rolesView: any = ''
  employeeId: any = ''

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
  ) {
    this.employeeId = localStorage.getItem('userName')
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
  }



  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

}
