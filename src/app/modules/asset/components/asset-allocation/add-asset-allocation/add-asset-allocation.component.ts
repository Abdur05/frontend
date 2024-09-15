import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssetAllocationService } from '../../../services/asset-allocation.service';

@Component({
  selector: 'app-add-asset-allocation',
  templateUrl: './add-asset-allocation.component.html',
  styleUrls: ['./add-asset-allocation.component.css']
})
export class AddAssetAllocationComponent {

  assetAllocationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  assetTypeDetail: any = []
  isShowScreenMenu:any =true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private assetSer: AssetAllocationService
  ) { }

  ngOnInit(): void {
    this.data()
    this.getAllAssetType()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.assetAllocationFormGroup = this.fb.group({
      assetId: ['', Validators.required],
      assetName: [''],
      assetType: [''],
    });
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.assetAllocationFormGroup.invalid)
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

      this.assetAllocationFormGroup.value.createdOn = fullDate
      this.assetAllocationFormGroup.value.createdBy = username
      this.assetAllocationFormGroup.value.changedOn = fullDate
      this.assetAllocationFormGroup.value.changedBy = username

      const result: any = await this.assetSer.createassetMaintenance(this.assetAllocationFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/asset/asset-location-list/'])
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

  async getAllAssetType() {
    try {
      const result: any = await this.assetSer.getAllAssetTypeDetail()
      if (result.status === true) {
        this.assetTypeDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
}
