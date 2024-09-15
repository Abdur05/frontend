import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanApprovalComponent } from './add-loan-approval.component';

describe('AddLoanApprovalComponent', () => {
  let component: AddLoanApprovalComponent;
  let fixture: ComponentFixture<AddLoanApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanApprovalComponent]
    });
    fixture = TestBed.createComponent(AddLoanApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
