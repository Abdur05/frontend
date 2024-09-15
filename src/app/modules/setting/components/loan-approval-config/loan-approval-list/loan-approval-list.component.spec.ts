import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApprovalListComponent } from './loan-approval-list.component';

describe('LoanApprovalListComponent', () => {
  let component: LoanApprovalListComponent;
  let fixture: ComponentFixture<LoanApprovalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanApprovalListComponent]
    });
    fixture = TestBed.createComponent(LoanApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
