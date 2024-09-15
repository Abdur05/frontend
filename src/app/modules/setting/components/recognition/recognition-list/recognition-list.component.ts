import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RecognitionService } from '../../../services/recognition/recognition.service';

@Component({
  selector: 'app-recognition-list',
  templateUrl: './recognition-list.component.html',
  styleUrls: ['./recognition-list.component.css']
})
export class RecognitionListComponent {

  isShowPadding: any = false
  recognitionDetail: any = []
  selectAll: any = false
  page?: number = 0;
  itemsPerPage = 10;
  isShowScreenMenu: any = true;
  rolesView: any = ''
  employeeId: any = ''
  myawardDetail: any = [];

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private recognitionSer: RecognitionService
  ) {
    this.employeeId = localStorage.getItem('userName')
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllRecognitionDetail(this.page, this.itemsPerPage)
    this.getAllRecognition(this.page, this.itemsPerPage)
  }



  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllRecognitionDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.recognitionSer.getAllAwardNominatorDetail(page, itemsPerPage)
      if (result.status === true) {
        this.recognitionDetail = result.data.nominatorList
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllRecognition(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.recognitionSer.getAllAwardNominator(page, itemsPerPage)
      if (result.status === true) {
        this.myawardDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

}
