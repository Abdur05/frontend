import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetAllocationService } from '../../../services/asset-allocation.service';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { AssetService } from '../../../services/asset/asset.service';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css']
})
export class EditAssetComponent {

  assetAllocationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  assetAllocationDetail: any = []
  employeeDetail: any = []
  selectedEmployeeId: '' | undefined
  today: string = '';
  selectedAssetId: '' | undefined
  assetMainteinanceDetail: any = []
  filterAssetAllocationDetail: any = []
  assetAllocateId: any = ''
  isShowScreenMenu: any = true;

  constructor(

    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private assetSer: AssetAllocationService,
    private profileSer: MyProfileService,
    private assetAllocateSer: AssetService,
    private activateRouter: ActivatedRoute

  ) {
    this.today = new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this.assetAllocateId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getAllAssetType()
    this.getAllEmployeeDetail()
    this.getAllAssetMaintainTypeDetail()
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
      _id: [''],
      assetId: ['', Validators.required],
      assetName: ['', Validators.required],
      employeeId: ['', Validators.required],
      assetTypeId: ['', Validators.required],
      assetType: ['', Validators.required],
      allocate_date: [''],
      createdOn: [''],
      createdBy: ['']
    });
  }

  async submitData() {
    try {
      console.log(this.assetAllocationFormGroup.value);

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

      this.assetAllocationFormGroup.value.changedOn = fullDate
      this.assetAllocationFormGroup.value.changedBy = username

      const result: any = await this.assetAllocateSer.updateassetAllocation(this.assetAllocationFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/asset/asset-list/'])
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
      const result: any = await this.assetSer.getAllassetMaintenanceDetails()
      console.log(result);

      if (result.status === true) {
        this.assetAllocationDetail = result.data

      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleAssetMain(event: any) {
    const findAssetDetail = this.assetAllocationDetail.find((el: any) => el._id === event.target.value)
    console.log(findAssetDetail, 'ppp');

    this.assetAllocationFormGroup.controls.assetId.setValue(findAssetDetail.assetId)
    this.assetAllocationFormGroup.controls.assetType.setValue(findAssetDetail.assetType)

  }

  handleAsset(event: any) {
    if (event.target.value) {
      this.filterAssetAllocationDetail = this.assetAllocationDetail.filter((el: any) => el.assetType === event.target.value && el.isAvailable === 'Y')
      const findMaintanceDetails: any = this.assetMainteinanceDetail.find((el: any) => el.assetTypeName === event.target.value)
      console.log(this.filterAssetAllocationDetail, '000');
      this.assetAllocationFormGroup.controls.assetTypeId.setValue(findMaintanceDetails._id)
    }

  }

  typeaheadOnSelect1(event: any) {
    console.log('Selected value: ', event.value);
    this.selectedAssetId = event.value;
    const assetList = this.assetAllocationDetail.find((el: any) => el.assetId === event.value);
    this.assetAllocationFormGroup.controls.assetName.setValue(assetList.assetName)

  }

  async getAllEmployeeDetail() {
    try {
      const result: any = await this.profileSer.getAllMyProfileDetails()
      if (result) {
        this.employeeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
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

  async getAllAssetMaintainTypeDetail() {
    try {
      const result: any = await this.assetSer.getAllAssetTypeDetail()
      console.log(result);
      if (result.status === true) {
        this.assetMainteinanceDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async singleAssetDetails() {
    try {
      const result: any = await this.assetAllocateSer.singleassetAllocationDetails(this.assetAllocateId)
      if (result.status === true) {
        this.assetAllocationFormGroup.patchValue(result.data)
        this.filterAssetAllocationDetail = this.assetAllocationDetail.filter((el: any) => el.assetType === this.assetAllocationFormGroup.value.assetType && el.isAvailable === 'Y')

      }
    } catch (error) {
      console.log(error)
    }
  }
}
