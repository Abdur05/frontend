import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppreciateNoteService } from '../../../services/appreciateNote/appreciate-note.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appreciation-note-list',
  templateUrl: './appreciation-note-list.component.html',
  styleUrls: ['./appreciation-note-list.component.css']
})
export class AppreciationNoteListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;
  isShowPadding: any = false
  appreciationNoteDetail: any = []
  isShowScreenMenu: any = true;
  rolesView: any = false;
  allappreciationNoteDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  records: any = 0

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private appreciationNoteSer: AppreciateNoteService
  ) { }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllAppreciationDetail(this.page, this.itemsPerPage)
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllAppreciationDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.appreciationNoteSer.getAllAppreciationDetail(page, itemsPerPage)
      if (result.status === true) {
        this.appreciationNoteDetail = result.data.appreciateNoteList
        this.allappreciationNoteDetail = result.data.appreciateNoteList
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.isActive = data.isActive === true ? false : true
          data.disable = true
          const result: any = await this.appreciationNoteSer.deleteAppreciationDetail(data);
          if (result.status === true) {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllAppreciationDetail(this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllAppreciationDetail(this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllAppreciationDetail(this.records, this.itemsPerPage)
        }
      });
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.appreciationNoteDetail = this.allappreciationNoteDetail;
      return;
    }

    this.appreciationNoteDetail = this.allappreciationNoteDetail.filter((obj: any) =>
      ((obj.templateName.toUpperCase()).includes(filterValue) || (obj.note.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.appreciationNoteDetail = this.allappreciationNoteDetail.filter((obj: any) =>
      ((obj.templateName.toUpperCase()).includes(filterValue) || (obj.note.toUpperCase()).includes(filterValue)))

  }

}
