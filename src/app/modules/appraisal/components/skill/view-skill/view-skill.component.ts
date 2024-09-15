import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { SkillService } from '../../../services/skill/skill.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-skill',
  templateUrl: './view-skill.component.html',
  styleUrls: ['./view-skill.component.css']
})
export class ViewSkillComponent implements OnInit {

  skillFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  designationList: any = [''];
  skillsId: any = ''

  constructor(
    private fb: FormBuilder,
    private desginationSer: DesignationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private skillSer: SkillService,
    public dialogRef: MatDialogRef<ViewSkillComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.getDesignationDetails()
  }

  ngOnInit(): void {
    this.skillsId = this.data;
    this.createFormFields()
    this.singleSkillsDetails()
  }

  createFormFields() {
    this.skillFormGroup = this.fb.group({
      _id: [''],
      skillName: [ [Validators.required]],
      description: [ [Validators.required]],
      designation: [ [Validators.required]]

    })
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  // Get Single details for Exchange Rate 
  async singleSkillsDetails() {
    try {
      const result: any = await this.skillSer.singleskillDetail(this.skillsId);
      console.log(result, 'view skill');

      if (result.status === '401') {
        this.router.navigate(['/'])
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

      if (result.status === true) {
        console.log(result.data)
        this.skillFormGroup.patchValue(result.data);
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      console.log(error);
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


  // async submitData(){
  //   try {
  //    this.isSubmitted = true;
  //    if(this.skillFormGroup.invalid){
  //     return
  //    } 
  //    this.router.navigate(['/appraisal/skill-list'])
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }


}
