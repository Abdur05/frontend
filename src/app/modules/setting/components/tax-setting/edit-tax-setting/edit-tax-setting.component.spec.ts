import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxSettingComponent } from './edit-tax-setting.component';

describe('EditTaxSettingComponent', () => {
  let component: EditTaxSettingComponent;
  let fixture: ComponentFixture<EditTaxSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaxSettingComponent]
    });
    fixture = TestBed.createComponent(EditTaxSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
