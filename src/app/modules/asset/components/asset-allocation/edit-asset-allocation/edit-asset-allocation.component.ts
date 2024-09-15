import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetAllocationService } from '../../../services/asset-allocation.service';

@Component({
  selector: 'app-edit-asset-allocation',
  templateUrl: './edit-asset-allocation.component.html',
  styleUrls: ['./edit-asset-allocation.component.css']
})
export class EditAssetAllocationComponent {

  assetAllocationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  assetTypeDetail: any = []
  assetDataId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private assetSer: AssetAllocationService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.assetDataId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getAllAssetType()
    this.singleAssetDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  data() {
    this.assetAllocationFormGroup = this.fb.group({
      _id: ['', Validators.required],
      assetId: ['', Validators.required],
      assetName: [''],
      assetType: [''],
    });
  }



  async singleAssetDetails() {
    try {
      const result: any = await this.assetSer.singleassetMaintenanceDetails(this.assetDataId)
      if (result.status === true) {
        this.assetAllocationFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
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

      const result: any = await this.assetSer.updateassetMaintenance(this.assetAllocationFormGroup.value)
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
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

}
