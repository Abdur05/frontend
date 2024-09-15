import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeneralSettingComponent } from './add-general-setting.component';

describe('AddGeneralSettingComponent', () => {
  let component: AddGeneralSettingComponent;
  let fixture: ComponentFixture<AddGeneralSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGeneralSettingComponent]
    });
    fixture = TestBed.createComponent(AddGeneralSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
