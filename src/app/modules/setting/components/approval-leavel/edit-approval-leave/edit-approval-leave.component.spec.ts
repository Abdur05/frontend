import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditApprovalLeaveComponent } from './edit-approval-leave.component';

describe('EditApprovalLeaveComponent', () => {
  let component: EditApprovalLeaveComponent;
  let fixture: ComponentFixture<EditApprovalLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditApprovalLeaveComponent]
    });
    fixture = TestBed.createComponent(EditApprovalLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
