import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplyLeaveComponent } from './add-apply-leave.component';

describe('AddApplyLeaveComponent', () => {
  let component: AddApplyLeaveComponent;
  let fixture: ComponentFixture<AddApplyLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApplyLeaveComponent]
    });
    fixture = TestBed.createComponent(AddApplyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
