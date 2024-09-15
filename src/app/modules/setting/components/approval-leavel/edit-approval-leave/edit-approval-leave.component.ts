import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LeaveTypeService } from '../../../services/leaveType/leave-type.service';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { ApplyLeaveService } from '../../../services/apply-leave/apply-leave.service';

@Component({
  selector: 'app-edit-approval-leave',
  templateUrl: './edit-approval-leave.component.html',
  styleUrls: ['./edit-approval-leave.component.css']
})
export class EditApprovalLeaveComponent {
  applyLeaveFormData: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  leaveTypeDetail: any = [];
  selectedEmployeeId: '' | undefined
  employeeDetail: any = []
  applyLeaveId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private leaveTypeSer: LeaveTypeService,
    private profileSer: MyProfileService,
    private applyLeaveSer: ApplyLeaveService,
    private activateRouter: ActivatedRoute


  ) {
    this.getAllEmployeeDetail()
  }

  ngOnInit(): void {
    this.applyLeaveId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getAllLeaveTypeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  data(val?: any) {
    console.log(val, '1111');

    if (val) {
      this.applyLeaveFormData = this.fb.group({
        _id: [val._id, Validators.required],
        employeeId: [val.employeeId],
        leaveTypeId: [val.leaveTypeId],
        leaveType: [val.leaveType],
        emailId: [val.emailId, [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
        reasonForLeave: [val.reasonForLeave],
        datefrom: [val.datefrom],
        dateTo: [val.dateTo],
        reportingManager: [val.reportingManager],
        employeeName: [val.employeeName],
        approvalBy: [''],
        approvalOn: [''],
        tableRows: this.fb.array(val.tableRows.map((ele: any) => this.getTable(ele)))
      });

      return
    }
    this.applyLeaveFormData = this.fb.group({
      _id: ['', Validators.required],
      employeeId: [''],
      leaveTypeId: [''],
      leaveType: [''],
      emailId: ['', [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      reasonForLeave: [''],
      datefrom: [''],
      dateTo: [''],
      reportingManager: [''],
      employeeName: [''],
      tableRows: this.fb.array([])

    });
  }
  getTable(val?: any): FormGroup {
    console.log(val, 'oooo');

    if (val) {
      return this.fb.group({

        dayName: [val.dayName],
        date: [val.date],
        leaveType: [val.leaveType]
      })

    }
    return this.fb.group({

      dayName: [''],
      date: [''],
      leaveType: ['']
    })
  }


  get tableRows(): FormArray {
    return this.applyLeaveFormData.get('tableRows') as FormArray;
  }

  count() {
    // Clear existing rows
    while (this.tableRows.length !== 0) {
      this.tableRows.removeAt(0);
    }

    const datefrom = new Date(this.applyLeaveFormData.get('datefrom').value);
    const dateTo = new Date(this.applyLeaveFormData.get('dateTo').value);

    // Add rows for each day in the date range
    while (datefrom <= dateTo) {
      this.addRow(datefrom);
      datefrom.setDate(datefrom.getDate() + 1); // Increment date by 1 day
    }
  }

  addRow(date: Date) {
    const row = this.fb.group({
      dayName: [this.getDayName(date)],
      date: [this.formatDate(date)],
      leaveType: ['Full Day']
    });
    this.tableRows.push(row);
  }

  getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }




  async singleApplyLeaveDetail() {
    try {
      const result: any = await this.applyLeaveSer.singleApplyLeaveDetail(this.applyLeaveId)

      if (result.status === true) {
        this.data(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }



  async submitData(status: any) {
    try {
      this.isSubmitted = true
      console.log(this.applyLeaveFormData.value);

      if (this.applyLeaveFormData.invalid)
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

      this.applyLeaveFormData.value.changedOn = fullDate
      this.applyLeaveFormData.value.changedBy = username
      this.applyLeaveFormData.value.approvalOn = fullDate
      this.applyLeaveFormData.value.approvalBy = username
      this.applyLeaveFormData.value.status = status;
      const result: any = await this.applyLeaveSer.updatApplyLeaveDetail(this.applyLeaveFormData.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/approval-leave/'])
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



  async getAllLeaveTypeDetail() {
    try {
      const result: any = await this.leaveTypeSer.getAllleaveTypeDetails()
      if (result.status === '1') {
        this.leaveTypeDetail = result.data

      }
    } catch (error) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  handleLeaveType(event: any) {
    if (event.target.value) {
      const findLeaveType = this.leaveTypeDetail.find((el: any) => el._id === event.target.value)
      this.applyLeaveFormData.controls.leaveType.setValue(findLeaveType.leaveType)
    }
  }

  async getAllEmployeeDetail() {
    try {
      const result: any = await this.profileSer.getAllMyProfileDetails()
      if (result) {
        this.employeeDetail = result.data;
        this.singleApplyLeaveDetail()
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  typeaheadOnSelect(event: any) {
    console.log('Selected value: ', event.value);
    this.selectedEmployeeId = event.value;
    const salesList = this.employeeDetail.find((el: any) => el.employeeId === event.value);
    // this.createDeliveryFormFields(salesList)
  }

}
