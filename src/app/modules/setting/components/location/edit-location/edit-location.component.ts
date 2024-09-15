import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../services/location/location.service';
import Swal from 'sweetalert2';
import { CompanyCodeService } from '../../../services/companyCode/company-code.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent {


  locationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  perviousValue: any = '';
  locationDataId: any = ''
  countryDetials: any = [];
  languageDetails: any;
  stateDetails: any;
  citiesDetails: any;
  isLookValue: any = false;
  isShowScreenMenu:any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private locationSer: LocationService,
    private activateRouter: ActivatedRoute,
    private companyCodeSer: CompanyCodeService

  ) { }

  ngOnInit(): void {
    this.locationDataId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.singleQuestionDetail()
    this.getCountryDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  data() {
    this.locationFormGroup = this.fb.group({
      _id: ['', Validators.required],
      locationId: ['',[Validators.required]],
      locationName: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: [''],
      city: ['', Validators.required],
      stateId: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      pinCode: ['', [Validators.minLength(6), Validators.maxLength(6)]]
    })

  }

  checkInputLength(event: any) {
    if (event.target.value) {

      if (this.locationFormGroup.value.locationId.length > 3) {
        this.locationFormGroup.controls.companyCode.setValue(this.perviousValue)
        return
      }
    }
  }

  async singleQuestionDetail() {
    try {
      const result: any = await this.locationSer.singleLocationDetails(this.locationDataId)
      if (result.status === '1') {
        this.locationFormGroup.patchValue(result.data)
        this.stateDetails = this.countryDetials.find((el: any) => el._id === this.locationFormGroup.value.countryId);
        const findCity = this.stateDetails.states.find((el: any) => el._id === this.locationFormGroup.value.stateId);
        console.log(findCity)
        this.citiesDetails = findCity.cities[0]

      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.locationFormGroup.invalid)
        return
      const result: any = await this.locationSer.updateLocation(this.locationFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/location-list/'])
        return
      }
      if (result.status === '0') {
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

  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
        
        this.singleQuestionDetail();
      } else {
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



  selectCountryName(event: any) {
    this.stateDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    console.log(this.stateDetails);
    if (this.stateDetails) {
      this.locationFormGroup.controls.countryName.setValue(this.stateDetails.countryName)
    }

  }


  handleState(event: any) {
    var findCity = this.stateDetails.states.find((el: any) => el._id === event.target.value);
    this.locationFormGroup.controls.stateName.setValue(findCity.states)

    this.citiesDetails = findCity.cities[0]
  }

  handleEvent(event: any) {
    if (event.target.value) {
      setTimeout(() => {
        if (!this.isLookValue) {
          const findCities = this.citiesDetails.cities.find((el: any) => el === event.target.value.toLowerCase());
          if (!findCities) {
            this.createState(event.target.value)
          }

        }
      }, 500);
    }
  }

  async createState(city: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want add new city in state",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.citiesDetails.cities.push(city);
          const reqBody = {
            stateId: this.locationFormGroup.value.stateId,
            cities: this.citiesDetails.cities
          }
          console.log(reqBody, 'kkk');
          const result: any = await this.companyCodeSer.updateCity(reqBody);
          if (result.status === '1') {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            return;
          }
          if (result.status === '0') {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.locationFormGroup.get('city').setErrors({ customError: true })
        }
      });

    } catch (error) {
      console.error(error);
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  typeaheadOnSelect(event: any) {
    if (event.value) {
      this.isLookValue = true
    }
  }

}
