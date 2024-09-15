import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxSubmissionEmployeeComponent } from './add-tax-submission-employee.component';

describe('AddTaxSubmissionEmployeeComponent', () => {
  let component: AddTaxSubmissionEmployeeComponent;
  let fixture: ComponentFixture<AddTaxSubmissionEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaxSubmissionEmployeeComponent]
    });
    fixture = TestBed.createComponent(AddTaxSubmissionEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
