import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PolicyService } from '../../../services/policy/policy.service';
import { ViewPolicyComponent } from '../view-policy/view-policy.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { ViewImageComponent } from 'src/app/modules/setting/components/viewImage/view-image/view-image.component';
import { RoleService } from 'src/app/modules/setting/services/role/role.service';
import { ViewPdfComponent } from 'src/app/modules/setting/components/view-pdf/view-pdf/view-pdf.component';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  policyDataformGroup: any = FormGroup
  isShowPadding: any = false
  policyDetail: any = []
  selectAll: any = false
  allpolicyDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };

  roleDetail: any = [];
  rolesDetails: any = [];
  rolesView: any = [];
  isShowScreenMenu: any = true;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private policySer: PolicyService,
    private dialog: MatDialog,
    private roleSer: RoleService,
    private cd: ChangeDetectorRef

  ) {
    var rolesLists: any = localStorage.getItem('roles');
    rolesLists = JSON.parse(rolesLists);
    var roleId: any = localStorage.getItem('roleId')
    // this.rolesDetails = rolesLists.find((el: any) => el.roleId === roleId);
    // this.rolesView = this.rolesDetails.rolesAccess.find((el: any) => el.screenId === 'Policy Documents');

  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    console.log(this.rolesView, 'this.rolesView')
    this.cd.detectChanges();
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllpolicyDetail(this.filterText, this.page, this.itemsPerPage)
    this.getAllRoleDetail()
  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllpolicyDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllpolicyDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.policySer.getManypolicyDetailPage(page, itemsPerPage)
      if (result.status === true) {
        this.policyDetail = result.data
        this.allpolicyDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }



  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to permanently delete this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {

          const result: any = await this.policySer.deleteHardDeletePolicyDetail(data._id);
          if (result.status === true) {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllpolicyDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllpolicyDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllpolicyDetail(this.filterText, this.records, this.itemsPerPage)
        }
      });
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.policyDetail = this.allpolicyDetail;
      return;
    }

    this.policyDetail = this.allpolicyDetail.filter((obj: any) =>
      ((obj.policyName.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.policyDetail = this.allpolicyDetail.filter((obj: any) =>
      ((obj.policyName.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }

  openDialog(fileName: any, i: any) {
    console.log(this.policyDetail[i])
    console.log(this.policyDetail[i].upload_policy);
    const splitValue = this.policyDetail[i].upload_policy.split('.');
    console.log(splitValue[1], 'split');

    let dialogRef: any;
    if (splitValue[1] === 'pdf') {
      dialogRef = this.dialog.open(ViewPdfComponent, {
        data: fileName
      });
    }
    else {
      dialogRef = this.dialog.open(ViewImageComponent, {
        data: fileName
      });
    }

    // let result: any;
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  async getAllRoleDetail() {
    try {
      const result: any = await this.roleSer.getAllrolesDetails()
      if (result.status === 1) {
        this.roleDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



}
