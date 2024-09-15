import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';
import { jwtDecode } from 'jwt-decode'

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit, AfterViewInit {
  SelectedName: any = 'Dashboard';
  subFolderName: any = 'Dashboard';
  @Output() isShowNav = new EventEmitter<any>();
  perviousParent: any = ''
  isFullScreen: any = false;
  userName: any = '';
  inactivityTimeout: any = 15000;
  inactivityTimer: any;
  @Input() logoutAction: any = ''
  isShowMenu: any = true;
  isShowForgot: any = false;
  isShowClear: any = false;
  isShowProfile: any = false;
  companyDetail: any = []
  companyCode: any = FormGroup
  companyCodeId: any = ''
  screenLevelDetails: any = []
  sampleOpen: any = [];
  isMenu: any = false;
  roleDetails: any = [];
  roleId: any = '';
  loginDetail: any = [];
  employeeName: any = ''
  filePath: any = ''
  isImageShow: any = false;
  imageSrc: any = '';
  subMenuName: any = ''

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authrSer: AuthrService,
    private cd: ChangeDetectorRef
  ) {
    if (localStorage.getItem('selectedName')) {
      this.SelectedName = localStorage.getItem('selectedName')
    }
    if (localStorage.getItem('subFolderName')) {
      this.subFolderName = localStorage.getItem('subFolderName');
      this.sampleOpen = localStorage.getItem('subFolderName');
    }
    if (localStorage.getItem('subMenu')) {
      this.subFolderName = localStorage.getItem('subFolderName');
      this.sampleOpen = localStorage.getItem('subFolderName');
      this.subMenuName = localStorage.getItem('subMenu');
    }

    this.userName = localStorage.getItem('userName');
    this.employeeName = localStorage.getItem('employeeName')
    this.filePath = localStorage.getItem('filePath')
    this.roleId = localStorage.getItem('roleId');

    if (!this.userName) {
      // this.router.navigate(['/authr/login'])
    }
  }

  ngOnInit(): void {
    var rolesDetails: any = localStorage.getItem('roles');
    rolesDetails = JSON.parse(rolesDetails);
    if (!rolesDetails) {
      this.getAllRolesScreenLevel()
    } else {
      if (rolesDetails.length === 0) {
        this.getAllRolesScreenLevel()
      }
      this.screenLevelDetails = rolesDetails;
    }

    // var screenLevelList: any = localStorage.getItem('screenLevel');
    // screenLevelList = JSON.parse(screenLevelList);
    // if (screenLevelList) {
    //   this.screenLevelDetails = screenLevelList;
    // }
    let arrow: any = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
      arrow[i].addEventListener("click", (e: any) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
        if (this.perviousParent) {
          this.perviousParent.classList.remove("showMenu");
        }
        this.perviousParent = e.target.parentElement.parentElement;

      });
    }
    this.setLogoutTimeout()
  }


  ngAfterViewInit(): void {
    // if (this.screenLevelDetails.length !== 0) {
    //   this.screenLevelDetails.map((el: any) => {
    //     el.subMenu.map((ele: any) => {
    //       ele.visible = false
    //     })
    //   })
    //   this.screenLevelDetails.map((el: any) => {
    //     el.subMenu.map((ele: any) => {
    //       const visibleDetails = this.updateVisibleValue(ele.subMenuName);
    //       if (visibleDetails === true) {
    //         el.visible = true
    //         ele.visible = true
    //         this.cd.detectChanges()
    //       }
    //     })
    //   })
    // }

  }




  nextPage(url: any, data: any) {
    
    let findScreenVisible:any = '';
    if(data.name.subMenuList.length !== 0){
       findScreenVisible = data.name.subMenuList.find((el:any) => el.visible === true);
    }else{
      findScreenVisible = data.name
    }
    if(!findScreenVisible.routerLink){
      return
    }
    this.SelectedName = data.name;
    this.subFolderName = data.main;
    console.log(data.name.subMenuList, 'data.name.subMenuList')
    this.router.navigate([`${findScreenVisible.routerLink}`])
    localStorage.setItem('selectedName', data.name.subMenuName)
    localStorage.setItem('subFolderName', data.main)
    if (data.name.subMenuList.length !== 0) {
      localStorage.setItem('subMenu', findScreenVisible.screenName)

    } else {
      localStorage.setItem('subMenu', '')

    }


  }

  closeNav() {
    this.isFullScreen = !this.isFullScreen;
    this.isShowNav.emit(this.isFullScreen)
    let sidebar: any = document.querySelector(".sidebar");
    let sidebarBtn: any = document.querySelector(".bx-menu");
    console.log(sidebar && sidebar.classList.contains('close'));
    if (sidebar && sidebar.classList.contains('close')) {
      sidebar.classList.remove('close');
      this.isMenu = true
    } else {
      // sidebarBtn.addEventListener("click", ()=>{
      sidebar.classList.toggle("close");
      this.isMenu = false
      // });
    }

  }

  async logout() {
    try {
      const userName = localStorage.getItem('userName')
      const result: any = await this.authrSer.logoutUser({ userName: userName })
      if (result.status === '1') {
        localStorage.clear();
        this.router.navigate(['/'])

      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getScreenLevelDetails() {
    try {
      const result: any = await this.authrSer.getScreenDetails()
      if (result.status === '1') {
        console.log(result.data, 'jjjj')
        this.screenLevelDetails = result.data
        const screenLevelList = JSON.stringify(result.data)
        localStorage.setItem('screenLevel', screenLevelList)
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      // this.isLoader = false
      console.log(error);
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



  async getAllRolesScreenLevel() {
    try {
      const result: any = await this.authrSer.getUserRolesDetails();
      if (result.status === '1') {
        this.roleDetails = result.data;
        const userId: any = localStorage.getItem('role')
        const departmentId: any = localStorage.getItem('departmentId')
        const designationId: any = localStorage.getItem('designationId')
        const findDetails = result.data.find((el: any) => el.roleId === userId);
        console.log(findDetails, 'findDetails', result.data)
        this.screenLevelDetails = findDetails.rolesAccess
        const rolesDetails = JSON.stringify(this.screenLevelDetails)
        localStorage.setItem('roles', rolesDetails)
        // this.getScreenLevelDetails()
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      console.log(error)
      this._snackBar.open('Something Went Wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  setLogoutTimeout() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decodedToken = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) return;

    const expiryTime = decodedToken.exp * 1000 - Date.now();
    if (expiryTime <= 0) {
      this.logout();
      return;
    }

    setTimeout(() => {
      this.logout();
    }, expiryTime);
  }


}
