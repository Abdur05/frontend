import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyProfileService } from '../../../services/my-profile/my-profile.service';
import Swal from 'sweetalert2';
import { RoleService } from 'src/app/modules/setting/services/role/role.service';
import { ViewMyProfileComponent } from '../view-my-profile/view-my-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-my-profile-list',
  templateUrl: './my-profile-list.component.html',
  styleUrls: ['./my-profile-list.component.css']
})
export class MyProfileListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;
  isShowPadding: any = false
  myProfileDetail: any = []
  selectAll: any = false
  allmyProfileDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = true
  records: any = 0
  filterText: any = {
    active: true,
    text: ""
  };
  roleDetail: any = [];
  rolesDetails: any = [];
  rolesView: any = [];
  totalItem: any = 0;
  isShowScreenMenu: any = true;
  sampleJson = [{
    "employeeId": "C002",
    "filePath": "employeesample.jpg",
    "firstName": "Vikash ",
    "middleName": "",
    "lastName": "Gupta",
    "gender": "Male",
    "dob": "1996-05-10",
    "dateOfJoining": "2020-06-02",
    "martialStatus": "Married",
    "bloodGroup": "B+",
    "mobile": "9876543210",
    "mailId": "aijaj535@gmail.com",
    "alternatemailId": "guptavikash@gmail.com",
    "designation": "SE",
    "department": "HR",
    "reportingManager": "C003",
    "role": "Admin",
    "templateId": "66308208f2fdfa57199bbc30",
    "locationId": "puraniya chauraha",
    "salary_details": [
      {
        "basic": 10000,
        "hra": 2000,
        "travel_allowance": 6000,
        "bonus": 5000,
        "variable_pay": 1000
      }
    ],
    "employeeTypeId": "monthly",
    "defaultShift": "",
    "presentAddress": [{
      "address": "Chennai",
      "country": "india",
      "city": "chennai",
      "state": "tamil nadu",
      "pinCode": "602026"
    }],
    "sameAsPresentAddress": true,
    "permanentAddress": [{
      "address": "Chennai",
      "country": "india",
      "city": "chennai",
      "state": "tamil nadu",
      "pinCode": "602026"
    }],
    "assetList": [
      {
        "assetId": "",
        "assetName": "",
        "assetType": ""
      }
    ],
    "bankDetails": [
      {
        "bankName": "ABCD",
        "branchName": "New",
        "accountNo": "78945685255",
        "accountHolderName": "Name",
        "ifceCode": "7895455",
        "bankAddress": "chennai"
      }
    ],
    "dependentList": [
      {
        "fullName": "Till 1",
        "newAddress": "chennai",
        "emailIdNew": "till1@gmail.com",
        "mobilePhone": "9545555885",
        "relationShip": "Brother",
        "occupation": "Business"
      }
    ],
    "documents": {
      "education": [
        {
          "education": "ABCD",
          "univercity": "ANNA",
          "education_start_date": "2020-07-30",
          "education_end_date": "2024-07-30",
          "education_student_id": "123456",
          "education_program_type": "Full Time",
          "education_marks_cgpa": "72",
          "attachCertificate": ""
        }
      ],
      "company": [
        {
          "companyName": "ABCD",
          "totalExperience": "",
          "experienceLetterFilePath": "",
          "hikeLetterFilePath": "",
          "paySlipFilePath": "",
          "company_start_date": "2019-07-30",
          "company_end_date": "2024-07-30",
          "company_reporting_manager": "ABCD",
          "company_reporting_manager_designation": "ABCD",
          "company_employee_id": "2024588",
          "company_reason_for_leaving": "Good"
        }
      ]
    },
    "kycList": [
      {
        "documentType": "adhar card",
        "documentNumber": "44144772755485",
        "uploadFile": "images.jpg"
      }
    ],
    "medicalList": [
      {
        "healthQuestion": "Have You any Diseases?",
        "yesCheck": "yes",
        "no": "",
        "date": ""
      }
    ],
    "roleId": "User",
    "userStatus": "O"
  }]
  fileInputId: any = '';
  selectedFile: any = '';
  currentPage = 1;
  isLoader: any = false;
  roleName:any = '';

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private myProfileSer: MyProfileService,
    private roleSer: RoleService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {

  }

  screenChange(event: any) {
    this.roleName = localStorage.getItem('roleId')
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
    this.getAllmyProfileDetailMany(this.filterText, this.page, this.itemsPerPage)
    this.getAllRoleDetail()
  }
  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.myProfileDetail.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    this.myProfileDetail[index].check = event.target.checked
    const findSelect = this.myProfileDetail.find((el: any) => el.check === false)
    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  handleFilterList(event: any) {
    console.log(event.target.value);
    this.filterText.active = event.target.value
    this.records = 0;
    this.currentPage = 1;
  }

  handleFilterDetails() {
    this.getAllmyProfileDetailMany(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllmyProfileDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.myProfileSer.getAllMyProfileDetailsPage(page, itemsPerPage)

      if (result.status) {
        result.data.data.map((el: any) => {
          el.check = false
        })
        this.myProfileDetail = result.data.data
        this.allmyProfileDetail = result.data.data;
        this.totalItem = result.data.totalRecords
      }
      this.isLoader = false;
    } catch (error) {
      console.error(error);
      this.isLoader = false;
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  async getAllmyProfileDetailMany(filter: any, page: any, itemsPerPage: any) {
      this.isLoader = true;
      try {
      const result: any = await this.myProfileSer.getAllMyProfileDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status) {
        result.data.data.map((el: any) => {
          el.check = false
        })
        this.myProfileDetail = result.data.data
        this.allmyProfileDetail = result.data.data;
        this.totalItem = result.data.totalRecords
      }
      this.isLoader = false;
      
    } catch (error) {
      console.log(error);
      this.isLoader = false;

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.myProfileDetail = this.allmyProfileDetail;
      return;
    }
    this.myProfileDetail = this.allmyProfileDetail.filter((obj: any) =>
      ((obj.employeeId.toUpperCase()).includes(filterValue) || (obj.firstName.toUpperCase()).includes(filterValue) || (obj.lastName.toUpperCase()).includes(filterValue) || (obj.mailId.toUpperCase()).includes(filterValue) || (obj.mobile.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.myProfileDetail = this.allmyProfileDetail.filter((obj: any) =>
      ((obj.employeeId.toUpperCase()).includes(filterValue) || (obj.firstName.toUpperCase()).includes(filterValue) || (obj.lastName.toUpperCase()).includes(filterValue) || (obj.mailId.toUpperCase()).includes(filterValue) || (obj.mobile.toUpperCase()).includes(filterValue)))
  }

  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to" + " " + (data.isActive === true ? 'Inactive' : 'Active') + " this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.isActive = data.isActive === true ? false : true
          data.userStatus = data.userStatus === 'C'  ? 'O' : 'C'

          data.disable = true;
          data.designation = data.designation._id;
          data.department = data.department._id;
          data.locationId = data.locationId._id;
          data.locationName = data.locationId.locationName;
          data.departmentName = data.department.departmentName;
          data.designationName = data.designation.designationName;
          const result: any = await this.myProfileSer.updateMyProfile(data, data._id);
          if (result.status) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllmyProfileDetailMany(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (!result.status) {
            this.getAllmyProfileDetailMany(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllmyProfileDetailMany(this.filterText, this.records, this.itemsPerPage)
        }
      });


    } catch (error: any) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  // async handleDeleteMuliple() {
  //   try {
  //     const filterData = this.myProfileDetail.filter((el: any) => el.check === true)
  //     filterData.map((el: any) => {
  //       el.isActive = "C"
  //     })
  //     const result: any = await this.myProfileSer.updateMyProfileDetailMany(filterData);
  //     if (result.status === '1') {
  //       this._snackBar.open("Deleted Successfully", '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-success',
  //       });
  //       this.getAllmyProfileDetail(this.page, this.itemsPerPage)
  //       return;
  //     }
  //     if (result.status === '0') {
  //       this._snackBar.open("Deleted Unsuccessfully", '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-error',
  //       });
  //     }

  //   } catch (error: any) {
  //     console.error(error)
  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });
  //   }


  // }

  async getAllRoleDetail() {
    try {
      const result: any = await this.roleSer.getAllrolesDetails()
      if (result.status === 1) {
        this.roleDetail = result.data
      }
    } catch (error: any) {
      console.error(error)
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  openDialog(id: any) {
    const dialogRef = this.dialog.open(ViewMyProfileComponent, {
      data: id,
      position: { top: '0px' },
      autoFocus:false
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.records = (this.page - 1) * this.itemsPerPage;
    this.getAllmyProfileDetailMany(this.filterText, this.records, this.itemsPerPage)
  }


  downloadExcel(): void {

    const sampleRecord = this.sampleJson
    this.myProfileSer.exportToExcel(sampleRecord, {}, 'Employee', 'Sheet1', 'sample');
  }

  exportExcel(): void {
    this.myProfileDetail.map((el: any) => { el.permanentAddress = []; el.presentAddress = []; el.bankDetails = []; })
    this.myProfileDetail.map((el: any) => {
      if (el.address.permanentAddress) {
        el.permanentAddress.push(el.address.permanentAddress)
      } else {
        el.permanentAddress = []
      }
      if (el.address.presentAddress) {
        el.presentAddress.push(el.address.presentAddress)
      } else {
        el.presentAddress = []
      }
      if (el.bankDetail) {
        el.bankDetails.push(el.bankDetail)
      } else {
        el.bankDetails = []
      }

    })
    this.isLoader = true;
    this.myProfileSer.exportToExcel(this.myProfileDetail, {}, 'Employee', 'Sheet1', 'export');
    this.getAllmyProfileDetailMany(this.filterText, this.records, this.itemsPerPage)
  }



  // File Upload
  importHandle(inputId: any) {
    Swal.fire({
      title: "Are you sure you want import?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.fileInputId = inputId;
        inputId.click()
      }
    });

  }


  // File Input
  handleFileData(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadFile()
  }

  async uploadFile() {
    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const reqHeader = {
        createdOn: '',
        createdBy: '',
        changedOn: '',
        changedBy: '',
      }
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

      reqHeader.createdOn = fullDate
      reqHeader.createdBy = username
      reqHeader.changedOn = fullDate
      reqHeader.changedBy = username
      this.isLoader = true
      const result: any = await this.myProfileSer.fileUploadXlsx(formData, reqHeader);
      this.fileInputId.value = ''
      if (result.status === '-1') {
        var message = result.message
        this.isLoader = false;
        const tableRows = result.data.map((row: any, i: any) => `
          <tr>
          <td>${i + 1}</td>
            <td>${row}</td>
          </tr>
        `).join('');
        Swal.fire({
          title: "Error processing file",
          icon: "error",
          confirmButtonText: "Ok",
          html: `
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Error Message</th>
        
                                    </tr>
                                </thead>
        
                                <tbody>
                                ${tableRows}
                                </tbody>
        
        
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,

        }).then((result) => {
          this.isLoader = false;

          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this._snackBar.open(message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        })
      }
      if (result.status === '1') {
        this.isLoader = false;

        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllmyProfileDetailMany(this.filterText, this.records, this.itemsPerPage)
        return;
      }

      if (result.status === '0') {
        var message = result.message;
        const tableRows = result.data.map((row: any, i: any) => `
          <tr>
          <td>${i + 1}</td>
            <td>${row.employeeId}</td>
            <td>${row.sheetName}</td>
            <td>${row.error}</td>
          </tr>
        `).join('');
        var details = result.data

        Swal.fire({
          title: "Error processing file",
          icon: "error",
          confirmButtonText: "Ok",
          html: `
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Employee Id</th>
                                        <th>sheetName</th>
                                        <th scope="col">error</th>
        
                                    </tr>
                                </thead>
        
                                <tbody>
                                ${tableRows}
                                </tbody>
        
        
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,

        }).then((result) => {
          this.isLoader = false;

          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this._snackBar.open(message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        })
      }
    } catch (error: any) {
      this.isLoader = false;

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }

  }

}
