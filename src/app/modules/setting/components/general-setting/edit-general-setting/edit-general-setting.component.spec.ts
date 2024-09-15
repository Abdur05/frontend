import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGeneralSettingComponent } from './edit-general-setting.component';

describe('EditGeneralSettingComponent', () => {
  let component: EditGeneralSettingComponent;
  let fixture: ComponentFixture<EditGeneralSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditGeneralSettingComponent]
    });
    fixture = TestBed.createComponent(EditGeneralSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
