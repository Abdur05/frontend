import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoanApprovalComponent } from './edit-loan-approval.component';

describe('EditLoanApprovalComponent', () => {
  let component: EditLoanApprovalComponent;
  let fixture: ComponentFixture<EditLoanApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLoanApprovalComponent]
    });
    fixture = TestBed.createComponent(EditLoanApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
