import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyDocumentsService } from '../../services/my-documents/my-documents.service';
import Swal from 'sweetalert2';
import { ViewPdfFileComponent } from 'src/app/modules/recruitment/components/pre-on-boarding/view-pdf-file/view-pdf-file.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css'],
})
export class MyDocumentsComponent {
  isShowPadding: any = false
  rolesDetails: any = [];
  rolesView: any = [];
  isShowScreenMenu: any = true;
  employeeId:any = '';
  years: number[] = [];
  selectedYear: any;
  Payslips: any = [];

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private MyDocumentsService: MyDocumentsService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    var rolesLists: any = localStorage.getItem('roles');
    rolesLists = JSON.parse(rolesLists);
    var roleId: any = localStorage.getItem('roleId')
    this.employeeId = localStorage.getItem('userName')
  }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear; 
    for (let i = 0; i < 10; i++) {
      this.years.push(currentYear - i);
    }
    this.getAllPayslips(this.selectedYear);
  }

  handleYear(event: any) {
    this.selectedYear = event.target.value;
    this.getAllPayslips(this.selectedYear);
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllPayslips(year: any) {
    try {
      const result: any = await this.MyDocumentsService.getAllPayslips(year)
      if (result.status) {
        this.Payslips = result.data;
      }
    } catch (error: any) {
      this.Payslips = [];
    }
  }

  handleUpdate(id: any) {
    const dialogRef = this.dialog.open(ViewPdfFileComponent, {
      data: id,
      width: '1000px',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
}
