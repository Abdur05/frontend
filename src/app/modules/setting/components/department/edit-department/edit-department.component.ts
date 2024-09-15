import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../../../services/department/department.service';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { DesignationService } from '../../../services/designation/designation.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent {


  departmentFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  perviousValue: any = '';
  departmentId: any = ''
  employeeDetail: any = []
  isShowScreenMenu:any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private departmentSer: DepartmentService,
    private activateRouter: ActivatedRoute,
    private profileSer: MyProfileService,
  ) { }

  ngOnInit(): void {
    this.departmentId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.singleDesignationDetail()
    this.getAllEmployeeDetail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.departmentFormGroup = this.fb.group({
      _id: ['', Validators.required],
      departmentId: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      description: ['', Validators.required],
      headofDepartment: ['', Validators.required],
      // desginationId:['', Validators.required],
      //desginationName:['', Validators.required]
    });
  }

  async singleDesignationDetail() {
    try {
      const result: any = await this.departmentSer.singledepartmentDetails(this.departmentId)
      if (result.status === '1') {
        this.departmentFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.departmentFormGroup)

      if (this.departmentFormGroup.invalid)
        return
      const result: any = await this.departmentSer.updatedepartment(this.departmentFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/department-list/'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }


    } catch (error: any) {
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

  async getAllEmployeeDetail() {
    try {
      const result: any = await this.profileSer.getAllMyProfileDetails()
      if (result) {
        this.employeeDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  
 

}
