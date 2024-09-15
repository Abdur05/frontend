import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxDecEmployeeComponent } from './add-tax-dec-employee.component';

describe('AddTaxDecEmployeeComponent', () => {
  let component: AddTaxDecEmployeeComponent;
  let fixture: ComponentFixture<AddTaxDecEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaxDecEmployeeComponent]
    });
    fixture = TestBed.createComponent(AddTaxDecEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
