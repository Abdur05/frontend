import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/modules/setting/services/department/department.service';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { LocationService } from 'src/app/modules/setting/services/location/location.service';
import { KraService } from '../../../services/kra/kra.service';

@Component({
  selector: 'app-add-kra',
  templateUrl: './add-kra.component.html',
  styleUrls: ['./add-kra.component.css']
})
export class AddKRAComponent {
  kraFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  designationList: any = [];
  locationList: any = [];
  departmentsList: any = [];
  isShowScreenMenu:any =  true;

  constructor(
    private fb: FormBuilder,
    private desginationSer: DesignationService,
    private locationSer: LocationService,
    private departmentSer: DepartmentService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private kraSer: KraService
  ) {
    this.getDesignationDetails()
    this.getLocationDetails()
    this.getDeparmentDetails()

  }

  ngOnInit(): void {
    this.createFormFields()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormFields() {
    this.kraFormGroup = this.fb.group({
      KRA_name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      description: ['', [Validators.required]],
      tagKRA: this.fb.array([])

    })
  }


  get tagKRa() {
    return this.kraFormGroup.get('tagKRA') as FormArray
  }

  createTagKRAFields() {
    return this.fb.group({
      basedOn: [''],
      tagTo: [''],
      weightage: ['']
    })
  }

  addTagKRA() {
    this.tagKRa.push(this.createTagKRAFields())
  }

  removeTagKRA(index: any) {
    this.tagKRa.removeAt(index);
  }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  async getDesignationDetails() {
    try {
      const result: any = await this.desginationSer.getAllDesignationDetails();
      console.log(result, 'result')
      if (result.status === '1') {
        this.designationList = result.data
      }
    } catch (error) {
      console.error(error);
      this._snackBar.open('Something Went Wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getLocationDetails() {
    try {
      const result: any = await this.locationSer.getAllLocationDetails();
      console.log(result, 'result')
      if (result.status === '1') {
        this.locationList = result.data
      }
    } catch (error) {
      console.error(error);
      this._snackBar.open('Something Went Wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getDeparmentDetails() {
    try {
      const result: any = await this.departmentSer.getAlldepartmentDetails();
      console.log(result, 'result')
      if (result.status === '1') {
        this.departmentsList = result.data
      }
    } catch (error) {
      console.error(error);
      this._snackBar.open('Something Went Wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



  async submitData() {
    try {
      this.isSubmitted = true
      if (this.kraFormGroup.invalid)
        return

      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.kraFormGroup.value.createdOn = fullDate
      this.kraFormGroup.value.createdBy = username
      this.kraFormGroup.value.changedOn = fullDate
      this.kraFormGroup.value.changedBy = username


      const result: any = await this.kraSer.createKRADetail(this.kraFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/appraisal/kra-list'])
        return
      }
      if (result.status === false) {
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

}
