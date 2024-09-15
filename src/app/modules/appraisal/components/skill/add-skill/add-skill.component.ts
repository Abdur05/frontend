import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { SkillService } from '../../../services/skill/skill.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {
  skillFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  designationList: any = [''];
  isShowScreenMenu:any = true;

  constructor(
    private fb: FormBuilder,
    private desginationSer: DesignationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private skillSer: SkillService,
  ) {
    this.getDesignationDetails()
  }

  ngOnInit(): void {
    this.createFormFields()
  }

  createFormFields() {
    this.skillFormGroup = this.fb.group({
      skillName: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      description: ['', [Validators.required]],
      designation: ['', [Validators.required]]

    })
  }
  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
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
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.skillFormGroup.invalid)
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

      this.skillFormGroup.value.createdOn = fullDate
      this.skillFormGroup.value.createdBy = username
      this.skillFormGroup.value.changedOn = fullDate
      this.skillFormGroup.value.changedBy = username


      const result: any = await this.skillSer.createskillDetail(this.skillFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/appraisal/skill-list'])
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
