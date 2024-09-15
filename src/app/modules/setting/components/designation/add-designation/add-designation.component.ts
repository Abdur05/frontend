import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DesignationService } from '../../../services/designation/designation.service';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent {


  departmentFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu:any = true;
  deparmentList:any = [];

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private designationSer: DesignationService,
    private departmentSer: DepartmentService


  ) { }

  ngOnInit(): void {
    this.data()
    this.getAllDesginationDetail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.departmentFormGroup = this.fb.group({
      designationId: ['', [Validators.required]],
      designationName: ['', Validators.required],
      description: [''],
      departmentId:['', Validators.required],
      departmentName:['', Validators.required]
    });
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.departmentFormGroup.invalid)
        return
      const result: any = await this.designationSer.creaeDesignation(this.departmentFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/designation-list/'])
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


  async getAllDesginationDetail() {
    try {
      const result: any = await this.departmentSer.getAlldepartmentDetails()
      if (result) {
        this.deparmentList = result.data
      }
    } catch (error:any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleDeparment(event:any){
    if(event.target.value){
      const findDetails = this.deparmentList.find((el:any) => el.departmentId === event.target.value);
      if(findDetails){
        this.departmentFormGroup.controls.departmentName.setValue(findDetails.departmentName)
      }
    }
  }
}
