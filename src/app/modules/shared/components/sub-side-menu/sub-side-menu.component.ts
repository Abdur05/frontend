import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-side-menu',
  templateUrl: './sub-side-menu.component.html',
  styleUrls: ['./sub-side-menu.component.css']
})
export class SubSideMenuComponent {
  screenDetails: any = [];
  isShowScreenMenu: any = '';
  screenList: any = [];
  @Output() isShowScreen = new EventEmitter<any>();
  rolesDetails: any = [];
  rolesView: any = {};
  menuName: any = ''
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    const folderName: any = localStorage.getItem('subFolderName')
    const userId: any = localStorage.getItem('userId')
    var roleDetails: any = localStorage.getItem('roles');
    var subMenuName: any = localStorage.getItem('subMenu');
    this.menuName = subMenuName;
    console.log(this.menuName, 'this.menuName')
    this.screenList = localStorage.getItem('selectedName')

    roleDetails = JSON.parse(roleDetails);
    this.isShowScreenMenu = roleDetails.filter((el: any) => el.subMenu.find((ele: any) => (el.menu === folderName && ele.subMenuList.length !== 0)));
    console.log(this.isShowScreenMenu, 'isShowScreenMenu')
    if (this.isShowScreenMenu.length !== 0) {
      this.isShowScreenMenu.map((el: any) => {
        el.subMenu.map((ele: any) => {
          ele.subMenuList.map((elem: any) => {
            if (elem.screenName === subMenuName) {
              elem.actionAccess.map((e: any) => {
                const keys: any = Object.values(e)
                this.rolesView = Object.assign(this.rolesView, { [keys[0].toLowerCase()]: keys[1] })
              })
            }
          })
        })
      })
      this.isShowScreen.emit({ visible: true, roleView: this.rolesView });
    } else {
      this.isShowScreenMenu = roleDetails.filter((el: any) => el.subMenu.find((ele: any) => (el.menu === folderName && ele.subMenuList.length === 0)));
      console.log(this.isShowScreenMenu, 'isShowScreenMenu');
      if (this.isShowScreenMenu.length !== 0) {
        this.isShowScreenMenu.map((el: any) => {
          el.subMenu.map((ele: any) => {
            console.log(el.screenName === this.screenList, el.screenName ,this.screenList)
            if (ele.screenName === this.screenList) {
              ele.actionAccess.map((e: any) => {
                const keys: any = Object.values(e)
                this.rolesView = Object.assign(this.rolesView, { [keys[0].toLowerCase()]: keys[1] })
              })
            }
          })
        })

        this.isShowScreen.emit({ visible: false, roleView: this.rolesView })
      } else {
        this.isShowScreen.emit({ visible: false, roleView: this.rolesView })

      }
    }
  }

  nextScreen(url: any, name: any) {
    if(!url){
      return;
    }
    localStorage.setItem('subMenu', name)
    this.router.navigate([`${url}`])
  }
}
