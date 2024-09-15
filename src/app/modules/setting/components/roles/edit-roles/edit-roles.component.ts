import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../services/role/role.service';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';
import { DesignationService } from '../../../services/designation/designation.service';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.css']
})
export class EditRolesComponent {
  userFormGroup: any = FormGroup;
  userDetails: any = [];
  rolesList: any = [];
  isShowPadding: any = false;
  idleState: any = 'Not Started';
  isLoader: any = false;
  isSubmitted: any = '';
  screenList: any = [];
  subScreenList: any = []
  isShowScreenMenu: any = true;
  deparmentList: any = [];
  desginationList: any = [];
  filterDesignationList: any = [];
  roleId: any = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private roleSer: RoleService,
    private authSer: AuthrService,
    private desginationSer: DesignationService,
    private deperamentSer: DepartmentService,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.roleId = this.activeRouter.snapshot.paramMap.get('id');

    this.createFormFields()
    this.getAllDeperamentDetails();

  }

  async getSingleRoleAccessDetails() {
    try {
      this.isLoader = true;
      const result: any = await this.roleSer.singlerolesDetails(this.roleId);
      console.log(result, 'single role');

      if (result.status === '401') {
        this.isLoader = false
        this.router.navigate(['/'])
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      if (result.status === '1') {
        this.isLoader = false;
        this.userFormGroup.patchValue(result.data);
        this.filterDesignationList = this.desginationList.filter((el: any) => el.departmentId === result.data.departmentId)
        console.log(this.filterDesignationList, 'kkk')
      }
      this.isLoader = false;
    } catch (error: any) {
      console.log(error)
      this.isLoader = false;
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormFields() {


    this.userFormGroup = this.fb.group({
      _id: [''],
      roleId: [''],
      roleName: ['', [Validators.required]],
      description: [''],
      designationId: ['', Validators.required],
      designationName: ['', Validators.required],
      departmentId: ['', Validators.required],
      departmentName: ['', Validators.required],
    })
  }



  async createUserManitenance() {
    try {
      this.isSubmitted = true;

      console.log(this.userFormGroup.value)
      if (this.userFormGroup.invalid)
        return
      this.userFormGroup.controls.roleId.setValue(this.userFormGroup.value.roleName)
      const result: any = await this.roleSer.updateroles(this.userFormGroup.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/role-list']);
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      this.isLoader = false;
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



  async getAllDeperamentDetails() {
    try {
      const result: any = await this.deperamentSer.getAlldepartmentDetails()
      if (result) {
        this.deparmentList = result.data
        this.getAllDesginationDetail();
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleDeparment(event: any) {
    if (event.target.value) {
      const findDetails = this.deparmentList.find((el: any) => el.departmentId === event.target.value);
      this.filterDesignationList = this.desginationList.filter((el: any) => el.departmentId === findDetails.departmentId)
      if (findDetails) {
        this.userFormGroup.controls.departmentName.setValue(findDetails.departmentName)
      }
    }
  }


  async getAllDesginationDetail() {
    try {
      const result: any = await this.desginationSer.getAllDesignationDetails()
      if (result) {
        this.desginationList = result.data
        this.getSingleRoleAccessDetails()
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleDesignation(event: any) {
    if (event.target.value) {
      const findDetails = this.filterDesignationList.find((el: any) => el.designationId === event.target.value);
      console.log(findDetails, 'findDetails'), this.filterDesignationList
      if (findDetails) {
        this.userFormGroup.controls.designationName.setValue(findDetails.designationName)
      }
    }
  }
}
