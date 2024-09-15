import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';
import { EmailNotificationService } from '../../../services/email-notificcation/email-notification.service';

@Component({
  selector: 'app-edit-email-notification',
  templateUrl: './edit-email-notification.component.html',
  styleUrls: ['./edit-email-notification.component.css']
})
export class EditEmailNotificationComponent {

  emailNotificationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  screenList: any = [];
  subScreenList: any = []
  dropdownList: any = [];
  sendTo: any = [];
  dropdownSettings: IDropdownSettings = {};
  emailNotifyId: any = '';
  isShowScreenMenu:any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private emailNotifySer: EmailNotificationService,
    private authSer: AuthrService,
    private activateRouter: ActivatedRoute

  ) {
    this.dropdownList = this.getData()
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id', // Specify the property to be used as the ID
      textField: 'item_text', // Specify the property to be displayed as text
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
    };
  }

  ngOnInit(): void {
    this.emailNotifyId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getAllScreenDetails()
    this.getSingleEmailNotificationDetail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  getData(): Array<any> {
    return [
      { item_id: 1, item_text: 'All Employee' },
      { item_id: 2, item_text: 'Reporting Manager' },
      { item_id: 3, item_text: 'HR' },
      { item_id: 4, item_text: 'HOD' },

    ]
  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.emailNotificationFormGroup = this.fb.group({
      _id: ['', Validators.required],
      notificationId: ['', [Validators.required]],
      description: [''],
      emailSubject: [''],
      emailContent: [''],
      fromScreen: [''],
      sendTo: ['']
    });
  }


  async getSingleEmailNotificationDetail() {
    try {
      const result: any = await this.emailNotifySer.singleEmailNotificationDetails(this.emailNotifyId)
      if (result.status === true) {
        this.emailNotificationFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }



  async submitData() {
    try {
      console.log(this.emailNotificationFormGroup.value);

      this.isSubmitted = true
      if (this.emailNotificationFormGroup.invalid)
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

      // this.emailNotificationFormGroup.value.createdOn = fullDate
      // this.emailNotificationFormGroup.value.createdBy = username
      this.emailNotificationFormGroup.value.changedOn = fullDate
      this.emailNotificationFormGroup.value.changedBy = username

      const result: any = await this.emailNotifySer.updateEmailNotification(this.emailNotificationFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/email-notification-list/'])
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

  async getAllScreenDetails() {
    try {
      const result: any = await this.authSer.getScreenDetails();
      if (result.status === '1') {
        this.screenList = result.data;
        this.screenList.map((el: any) => {
          el.subMenu.map((ele: any) => {
            this.subScreenList.push(ele)
          })
        })
      }
    } catch (error: any) {
      console.error(error)
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

}
