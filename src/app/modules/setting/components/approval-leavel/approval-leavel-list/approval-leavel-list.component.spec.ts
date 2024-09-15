import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalLeavelListComponent } from './approval-leavel-list.component';

describe('ApprovalLeavelListComponent', () => {
  let component: ApprovalLeavelListComponent;
  let fixture: ComponentFixture<ApprovalLeavelListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalLeavelListComponent]
    });
    fixture = TestBed.createComponent(ApprovalLeavelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
