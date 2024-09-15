import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxDecEmployeeComponent } from './edit-tax-dec-employee.component';

describe('EditTaxDecEmployeeComponent', () => {
  let component: EditTaxDecEmployeeComponent;
  let fixture: ComponentFixture<EditTaxDecEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaxDecEmployeeComponent]
    });
    fixture = TestBed.createComponent(EditTaxDecEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
