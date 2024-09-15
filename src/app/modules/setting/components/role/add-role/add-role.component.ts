import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role/role.service';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';
import { DesignationService } from '../../../services/designation/designation.service';
import { DepartmentService } from '../../../services/department/department.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {

  userFormGroup: any = FormGroup;
  userDetails: any = [];
  rolesList: any = [];
  isShowPadding: any = false;
  idleState: any = 'Not Started';
  isLoader: any = false;
  isSubmitted: any = '';
  screenList: any = [];
  subScreenList: any = []
  isShowScreenMenu: any = true;
  deparmentList:any = [];
  desginationList:any = [];
  filterDesignationList:any = [];
  filterRoleList:any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private roleSer: RoleService,
    private authSer: AuthrService,
    private desginationSer: DesignationService,
    private deperamentSer: DepartmentService
  ) { }

  ngOnInit(): void {
    this.createFormFields()
    this.getAllRoleDetails();
    this.getAllScreenDetails()
    this.getAllDeperamentDetails();
    this.getAllDesginationDetail()
  }


  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormFields(data?: any) {
    if (data) {
      this.userFormGroup = this.fb.group({
        roleId: ['', [Validators.required]],
        roleName: ['', [Validators.required]],
        designationId: ['', Validators.required],
        designationName: ['', Validators.required],
        departmentId: ['', Validators.required],
        departmentName: ['', Validators.required],
        rolesAccess: this.fb.array(data.map((el: any) => this.createRoleAccessField(el)))
      })
      return
    }

    this.userFormGroup = this.fb.group({
      roleId: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      designationId: ['', Validators.required],
      designationName: ['', Validators.required],
      departmentId: ['', Validators.required],
      departmentName: ['', Validators.required],
      rolesAccess: this.fb.array([this.createRoleAccessField()])
    })
  }



  get roleAccessControl() {
    return this.userFormGroup.get('rolesAccess') as FormArray
  }


  createRoleAccessField(data?: any) {
    if (data) {
      return this.fb.group({
        code: [data.code],
        menu: [data.menu],
        description: [data.description],
        visible: [data.visible],
        icon: [data.icon],
        isActive: [data.isActive],
        arrow: ['up'],
        subMenu: this.fb.array(data.subMenu.map((el: any) => this.createSubMenuDetails(el)))
      })
    }
    return this.fb.group({
      code: [''],
      menu: [''],
      description: [''],
      visible: [''],
      icon: [''],
      isActive: [''],
      arrow: ['up'],
      subMenu: this.fb.array([this.createSubMenuDetails()])
    })
  }

  createSubMenuDetails(data?: any) {
    if (data) {
      return this.fb.group({
        subMenuName: [data.subMenuName],
        visible: [data.visible],
        screenId: [data.screenId],
        screenName: [data.screenName],
        createdBy: [data.createdBy],
        routerLink: [data.routerLink],
        createdOn: [data.createdOn],
        changedOn: [data.changedOn],
        changedBy: [data.changedBy],
        description: [data.description],
        arrow: ['up'],
        actionAccess: this.fb.array(data.actionAccess.map((el: any) => this.createScreenAccess(el))),
        subMenuList: this.fb.array(data.subMenuList.map((el: any) => this.createSubMenuList(el)))
      })
    }
    return this.fb.group({
      subMenuName: [''],
      visible: [''],
      screenId: [''],
      screenName: [''],
      createdBy: [''],
      routerLink: [''],
      createdOn: [''],
      changedOn: [''],
      changedBy: [''],
      description: [''],
      arrow: ['up'],
      actionAccess: this.fb.array([this.createScreenAccess()]),
      subMenuList: this.fb.array([this.createSubMenuList()])
    })
  }

  createSubMenuList(data?: any) {
    if (data) {
      return this.fb.group({
        arrow: ['up'],
        screenId: [data.screenId],
        description: [data.description],
        visible: [data.visible],
        screenName: [data.screenName],
        routerLink: [data.routerLink],
        createdBy: [data.createdBy],
        createdOn: [data.createdOn],
        changedOn: [data.changedOn],
        changedBy: [data.changedBy],
        actionAccess: this.fb.array(data.actionAccess.map((el: any) => this.createScreenAccess(el)))

      })
    }
    return this.fb.group({
      arrow: ['up'],
      screenId: [''],
      description: [''],
      visible: [''],
      screenName: [''],
      routerLink: [''],
      createdBy: [''],
      createdOn: [''],
      changedOn: [''],
      changedBy: [''],
      actionAccess: this.fb.array([this.createScreenAccess()])
    })
  }

  createScreenAccess(data?: any) {
    if (data) {
      return this.fb.group({
        type: [data.type],
        visible: [data.visible],
      })
    }
    return this.fb.group({
      type: [''],
      visible: ['N'],

    })
  }

  addRoleAccessRow(singleAdded?: any) {
    this.roleAccessControl.push(this.createRoleAccessField())
    if (!singleAdded) {
      const formArray = this.userFormGroup.get('rolesAccess') as FormArray;

      this.userFormGroup.value.rolesAccess.map((el: any, i: any) => {
        const formGroup = formArray.at(i) as FormGroup;
        formGroup.patchValue({
          screenId: this.subScreenList[i].subMenuName
        })
      });
    }
  }

  deleteRoleAccessRow(index: any, screenId: any) {
    if (screenId) {
      this.subScreenList.map((el: any) => {
        if (el.subMenuName === screenId) {
          el.disable = false
        }
      })
    }
    this.roleAccessControl.removeAt(index);
  }


  async getAllScreenDetails() {
    try {
      const result: any = await this.authSer.getScreenDetails();
      if (result.status === '1') {
        this.screenList = result.data;
        this.createFormFields(this.screenList)
      }
    } catch (error: any) {
      console.error(error)
      this.isLoader = false;
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  async getAllRoleDetails() {
    try {
      const result: any = await this.roleSer.getAllrolesDetails();
      if (result.status === '1') {
        this.rolesList = result.data;
      }
    } catch (error: any) {
      console.error(error)
      this.isLoader = false;
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  handleCheck(event: any, text: any, index: any) {
    const formArray = this.userFormGroup.get('rolesAccess') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    if (event.target.checked) {
      formGroup.patchValue({
        [text]: 'Y'
      })
    } else {
      formGroup.patchValue({
        [text]: 'N'
      })
    }
  }

  handle(event: any) {
    if (event.target.value) {
      this.subScreenList.map((el: any) => {
        el.disable = false;
      })
      this.subScreenList.map((el: any) => el.disable = false)
      this.userFormGroup.value.rolesAccess.map((el: any) => {
        this.subScreenList.map((ele: any) => {
          if (el.screenId === ele.subMenuName) {
            ele.disable = true
          }
        })

      })
    }
  }




  selectRoleName(event: any) {
    if (event.target.value) {
      const findRole = this.rolesList.find((el: any) => el._id === event.target.value);
      this.userFormGroup.controls.roleName.setValue(findRole.roleName);
    }
  }


  async createUserManitenance() {
    try {
      this.isSubmitted = true;
      console.log(this.userFormGroup.value)
      if (this.userFormGroup.invalid)
        return
      const result: any = await this.roleSer.createScreenAccess(this.userFormGroup.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/roles-list']);
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      this.isLoader = false;
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


  addRoleAllAccessRow() {
    for (let i = 0; i < this.subScreenList.length; i++) {
      const itemsArray = this.userFormGroup.get('rolesAccess') as FormArray;
      const formGroup: any = itemsArray.at(i) as FormGroup;
      if (this.userFormGroup.value.rolesAccess[i]) {
        this.subScreenList[i].disable = true
        formGroup.patchValue({
          screenId: this.subScreenList[i].subMenuName,
        })
      } else {
        this.subScreenList[i].disable = true
        this.addRoleAccessRow(false);
      }
    }
  }


  viewList(value: any, index: any) {
    if (value) {

      const formArray = this.userFormGroup.get('rolesAccess') as FormArray;
      const formGroup = formArray.at(index) as FormGroup;
      if (formGroup.value.arrow === 'up') {
        this.userFormGroup.value.rolesAccess.map((el: any) => {
          el.arrow = 'up'
        })
        formGroup.patchValue({
          arrow: 'down'
        })
      } else {
        this.userFormGroup.value.rolesAccess.map((el: any) => {
          el.arrow = 'up'
        })
        formGroup.patchValue({
          arrow: 'up'
        })
      }

    }
  }


  viewSubList(value: any, index: any, jIndex: any) {
    if (value) {

      const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu') as FormArray;
      const formGroup = formArray.at(jIndex) as FormGroup;
      if (formGroup.value.arrow === 'up') {
        this.userFormGroup.value.rolesAccess.map((el: any) => {
          el.arrow = 'up'
          el.subMenu.map((ele: any) => ele.arrow = 'up')
        })
        formGroup.patchValue({
          arrow: 'down'
        })
      } else {
        this.userFormGroup.value.rolesAccess.map((el: any) => {
          el.arrow = 'up'
          el.subMenu.map((ele: any) => ele.arrow = 'up')
        })
        formGroup.patchValue({
          arrow: 'up'
        })
      }

    }
  }


  viewSubListMenu(value: any, index: any, jIndex: any, kIndex: any) {
    if (value) {

      const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(jIndex).get('subMenuList') as FormArray;
      const formGroup = formArray.at(kIndex) as FormGroup;
      if (formGroup.value.arrow === 'up') {
        this.userFormGroup.value.rolesAccess.map((el: any) => {
          el.arrow = 'up'
          el.subMenu.map((ele: any) => {
            ele.arrow = 'up'; ele.subMenuList.map((e: any) => e.arrow = 'up')
          })
        })
        formGroup.patchValue({
          arrow: 'down'
        })
      } else {
        this.userFormGroup.value.rolesAccess.map((el: any) => {
          el.arrow = 'up'
          el.subMenu.map((ele: any) => {
            ele.arrow = 'up'; ele.subMenuList.map((e: any) => e.arrow = 'up')
          })
        })
        formGroup.patchValue({
          arrow: 'up'
        })
      }

    }
  }


  checkAllHandle(event: any, index: any) {

    this.userFormGroup.value.rolesAccess.map((el: any, i: any) => {
      if (i === index) {
        const formArray = this.userFormGroup.get('rolesAccess') as FormArray;
        const formGroup = formArray.at(index) as FormGroup;
        formGroup.patchValue({
          visible: event.target.checked
        })

        el.subMenu.map((ele: any, j: any) => {
          const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu') as FormArray;
          const formGroup = formArray.at(j) as FormGroup;
          if (formGroup) {
            formGroup.patchValue({
              visible: event.target.checked
            })
          }
          if (ele.subMenuList.length === 0) {
            ele.actionAccess.map((e: any, k: any) => {
              const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(j).get('actionAccess') as FormArray;
              const formGroup = formArray.at(k) as FormGroup;
              if (formGroup) {
                formGroup.patchValue({
                  visible: event.target.checked
                })
              }

            })
          } else {
            ele.subMenuList.map((e: any, k: any) => {
              const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(j).get('subMenuList') as FormArray;
              const formGroup = formArray.at(k) as FormGroup;
              if (formGroup) {
                formGroup.patchValue({
                  visible: event.target.checked
                })
              }

              e.actionAccess.map((action: any, l: any) => {
                const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(j).get('subMenuList').at(k).get('actionAccess') as FormArray;
                const formGroup = formArray.at(l) as FormGroup;
                if (formGroup) {
                  formGroup.patchValue({
                    visible: event.target.checked
                  })
                }

              })

            })
          }

        })
      }


    })
  }


  handleSubMenuCheck(event: any, index: any, jindex: any) {
    this.userFormGroup.value.rolesAccess.map((el: any, i: any) => {
      if (index === i) {
        const formArray = this.userFormGroup.get('rolesAccess') as FormArray;
        const formGroup = formArray.at(index) as FormGroup;
        formGroup.patchValue({
          visible: true
        })
        el.subMenu.map((ele: any, j: any) => {
          const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu') as FormArray;
          const formGroup = formArray.at(jindex) as FormGroup;
          if (formGroup) {
            formGroup.patchValue({
              visible: event.target.checked
            })
          }
          if (ele.subMenuList.length === 0) {
            ele.actionAccess.map((e: any, k: any) => {
              const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(jindex).get('actionAccess') as FormArray;
              const formGroup = formArray.at(k) as FormGroup;
              if (formGroup) {
                formGroup.patchValue({
                  visible: event.target.checked
                })
              }

            })
          } else {
            ele.subMenuList.map((e: any, k: any) => {
              const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(jindex).get('subMenuList') as FormArray;
              const formGroup = formArray.at(k) as FormGroup;
              if (formGroup) {
                formGroup.patchValue({
                  visible: event.target.checked
                })
              }

              e.actionAccess.map((action: any, l: any) => {
                const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(jindex).get('subMenuList').at(k).get('actionAccess') as FormArray;
                const formGroup = formArray.at(l) as FormGroup;
                if (formGroup) {
                  formGroup.patchValue({
                    visible: event.target.checked
                  })
                }

              })

            })
          }
        })
        const findValue = this.userFormGroup.value.rolesAccess[index].subMenu.find((elf: any) => elf.visible === true);
        if (!findValue) {
          formGroup.patchValue({
            visible: false
          })
        }
      }

    })
  }

  handleSubMenuListCheck(event: any, index: any, jindex: any, kIndex: any) {
    this.userFormGroup.value.rolesAccess.map((el: any, i: any) => {
      const formArray = this.userFormGroup.get('rolesAccess') as FormArray;
      const formGroup = formArray.at(index) as FormGroup;
      formGroup.patchValue({
        visible: true
      })
      el.subMenu.map((ele: any, j: any) => {
        const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu') as FormArray;
        const formGroup = formArray.at(jindex) as FormGroup;
        if (formGroup) {
          formGroup.patchValue({
            visible: event.target.checked
          })
        }
        if (ele.subMenuList.length === 0) {
          ele.actionAccess.map((e: any, k: any) => {
            const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(jindex).get('actionAccess') as FormArray;
            const formGroup = formArray.at(kIndex) as FormGroup;
            if (formGroup) {
              formGroup.patchValue({
                visible: event.target.checked
              })
            }

          })
        } else {
          ele.subMenuList.map((e: any, k: any) => {
            const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(jindex).get('subMenuList') as FormArray;
            const formGroup = formArray.at(kIndex) as FormGroup;
            if (formGroup) {
              formGroup.patchValue({
                visible: event.target.checked
              })
            }

            e.actionAccess.map((action: any, l: any) => {
              const formArray = this.userFormGroup.get('rolesAccess').at(index).get('subMenu').at(jindex).get('subMenuList').at(kIndex).get('actionAccess') as FormArray;
              const formGroup = formArray.at(l) as FormGroup;
              if (formGroup) {
                formGroup.patchValue({
                  visible: event.target.checked
                })
              }

            })
            const findValue = this.userFormGroup.value.rolesAccess[index].subMenu[jindex].subMenuList.find((elf: any) => elf.visible === true);
            if (!findValue) {
              formGroup.patchValue({
                visible: false
              })
            }

          })

        }
      })
      const findValue = this.userFormGroup.value.rolesAccess[index].subMenu.find((elf: any) => elf.visible === true);
      if (!findValue) {
        formGroup.patchValue({
          visible: false
        })
      }
    })
  }


  async getAllDeperamentDetails() {
    try {
      const result: any = await this.deperamentSer.getAlldepartmentDetails()
      if (result) {
        this.deparmentList = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleDeparment(event:any){
    if(event.target.value){
      const findDetails = this.deparmentList.find((el:any) => el._id === event.target.value);
      this.filterDesignationList = this.desginationList.filter((el:any) => el.departmentId === findDetails.departmentId)
      if(findDetails){
        this.userFormGroup.controls.departmentName.setValue(findDetails.departmentName)
      }
    }
  }


  async getAllDesginationDetail() {
    try {
      const result: any = await this.desginationSer.getAllDesignationDetails()
      if (result) {
        this.desginationList = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleDesignation(event:any){
    if(event.target.value){
      const findDetails = this.filterDesignationList.find((el:any) => el._id === event.target.value);
      console.log(findDetails, 'findDetails'), this.filterDesignationList
      const findDeperamentDetails = this.deparmentList.find((el: any) => el._id === this.userFormGroup.value.departmentId);

      if(findDetails){
        this.userFormGroup.controls.designationName.setValue(findDetails.designationName)
      this.filterRoleList = this.rolesList.filter((el: any) => (el.departmentId === findDeperamentDetails.departmentId && el.designationId === findDetails.designationId));

      }
    }
  }

}
