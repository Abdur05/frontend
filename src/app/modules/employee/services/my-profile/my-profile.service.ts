import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as fs from 'file-saver'
@Injectable({
  providedIn: 'root'
})
export class MyProfileService {

  constructor(
    private http: HttpClient
  ) { }


  createMyProfile(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/employee/myProfile/create', data).toPromise()
  }

  getAllMyProfileDetails() {
    return this.http.get('http://localhost:4000/api/employee/myProfile/getAll').toPromise()
  }

  singleMyProfileDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/employee/myProfile/get/${id}`).toPromise()
  }
  updateMyProfile(data: any, id: any) {
    return this.http.put(`http://localhost:4000/api/employee/myProfile/update/${id}`, data).toPromise()
  }
  getAllMyProfileDetailsPage(skip?: any, itemsPerPage?: any) {
    const userId: any = localStorage.getItem('userName')
    return this.http.get(`http://localhost:4000/api/employee/myProfile/getAll/${skip}/${itemsPerPage}/${userId}`).toPromise()
  }

  updateMyProfileDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/employee/myProfile/update`, data).toPromise()
  }
  profileLogUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }


  getAllDocumentTypeDetails() {
    return this.http.get('http://localhost:4000/api/master/docType/getAll').toPromise()
  }

  getSaleryTemplId() {
    return this.http.get("http://localhost:4000/api/payroll/salaryTemplate/get").toPromise()
  }
  getAllMyProfileDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const userId: any = localStorage.getItem('userName')
    return this.http.post(`http://localhost:4000/api/employee/myProfile/getAll/${skip}/${itemsPerPage}/${userId}`, { filter: filter }).toPromise()

  }

  getAllLeaveBalanceDetailsOfEmployee(year: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/applyLeave/employeeLeaveSummery/${year}`, { headers }).toPromise()
  }

  fileUploadXlsx(data: any, reqHeader: any) {
    const userId = localStorage.getItem('userName')
    let headers: any = {
      'User-Id': userId, // Add the user ID to the headers
      'createdOn': reqHeader.createdOn,
      'createdBy': reqHeader.createdBy,
      'changedOn': reqHeader.changedOn,
      'changedBy': reqHeader.changedBy,
    };
    return this.http.post(`http://localhost:4000/api/employee/myProfile/bulkUpload`, data, { headers }).toPromise()
  }


  exportToExcel(data: any[], uomDetails: any, fileName: string, sheetName: string, sheetType: any): void {
    const salary_details: any = [];
    const assetList: any = []
    const dependentList: any = []
    const educationList: any = []
    const companyList: any = []
    const kycList: any = [];
    const medicalList: any = [];
    const presentAddressList: any = [];
    const prementAddressList: any = [];
    const bankDetails: any = [];

    console.log(data, 'data')
    data.map((el: any) => {
      el.salary_details.map((ele: any) => {
        ele.employeeId = el.employeeId;
        salary_details.push(ele)
      })
      el.assetList.map((ele: any) => {
        ele.employeeId = el.employeeId;
        assetList.push(ele)
      })
      el.dependentList.map((ele: any) => {
        ele.employeeId = el.employeeId;
        dependentList.push(ele)
      })
      el.documents.education.map((ele: any) => {
        ele.employeeId = el.employeeId;
        educationList.push(ele)
      })
      el.documents.company.map((ele: any) => {
        ele.employeeId = el.employeeId;
        companyList.push(ele)
      })
      el.kycList.map((ele: any) => {
        ele.employeeId = el.employeeId;
        kycList.push(ele)
      })
      el.medicalList.map((ele: any) => {
        ele.employeeId = el.employeeId;
        medicalList.push(ele)
      })
      el.permanentAddress.map((ele: any) => {
        ele.employeeId = el.employeeId;
        prementAddressList.push(ele)
      })
      el.presentAddress.map((ele: any) => {
        ele.employeeId = el.employeeId;
        presentAddressList.push(ele)
      })
      el.bankDetails.map((ele: any) => {
        ele.employeeId = el.employeeId;
        bankDetails.push(ele)
      })

    })
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
      delete el.medicalList
      delete el.kycList
      delete el.documents.company
      delete el.documents.education
      delete el.dependentList
      delete el.assetList
      delete el.permanentAddress
      delete el.presentAddress
      delete el?.bankDetail
      delete el.bankDetails
      delete el?.address
      delete el.salary_details;
      delete el?.documents
      delete el._id;
    })
    console.log(data, 'jjj')
    const workbook = new ExcelJS.Workbook();
    const addAndStyleWorksheet = (workbook: ExcelJS.Workbook, sheetName: string, data: any[], requiredFields: string[]) => {
      const worksheet: any = workbook.addWorksheet(sheetName);
      console.log(data[0])
      worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key: key, width: 20 }));
      data.forEach(item => worksheet.addRow(item));
      requiredFields.forEach(field => {
        const column: any = worksheet.getColumn(field);

        column.eachCell((cell: any, rowNumber: any) => {

          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFF0000' } // Yellow background FFFFAA00
          };
          cell.font = {
            bold: true,
            color: { argb: 'FFFFFFFF' } // Black text FF000000
          };
        });

      });

    };


    // Add main sheet
    addAndStyleWorksheet(workbook, 'Profile_Data', data, ['firstName', 'lastName', 'mobile', 'mailId', 'alternatemailId', 'designation', 'department', 'reportingManager', 'role', 'userStatus', 'employeeTypeId',]);
    addAndStyleWorksheet(workbook, 'PresentAddress', presentAddressList, []);
    addAndStyleWorksheet(workbook, 'PrementAddress', prementAddressList, []);

    addAndStyleWorksheet(workbook, 'bank', bankDetails, []);

    // Add plant data sheet
    addAndStyleWorksheet(workbook, 'Salary', salary_details, []);

    // Add sales data sheet
    addAndStyleWorksheet(workbook, 'Assest', assetList, []);

    // Add purchase data sheet
    addAndStyleWorksheet(workbook, 'Dependent', dependentList, []);

    // Add company code data sheet
    addAndStyleWorksheet(workbook, 'Eductaion', educationList, []);
    addAndStyleWorksheet(workbook, 'Company', companyList, []);
    addAndStyleWorksheet(workbook, 'KYC', kycList, []);
    addAndStyleWorksheet(workbook, 'Medical', medicalList, []);

    // Generate the Excel file
    workbook.xlsx.writeBuffer().then((buffer:any) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      fs.saveAs(blob, `${fileName}.xlsx`);
    });

  }

}
