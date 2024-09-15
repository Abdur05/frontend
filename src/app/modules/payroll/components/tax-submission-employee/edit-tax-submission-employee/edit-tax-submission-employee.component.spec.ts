import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxSubmissionEmployeeComponent } from './edit-tax-submission-employee.component';

describe('EditTaxSubmissionEmployeeComponent', () => {
  let component: EditTaxSubmissionEmployeeComponent;
  let fixture: ComponentFixture<EditTaxSubmissionEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaxSubmissionEmployeeComponent]
    });
    fixture = TestBed.createComponent(EditTaxSubmissionEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
