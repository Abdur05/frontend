import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyApprovalListComponent } from './my-approval-list.component';

describe('MyApprovalListComponent', () => {
  let component: MyApprovalListComponent;
  let fixture: ComponentFixture<MyApprovalListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyApprovalListComponent]
    });
    fixture = TestBed.createComponent(MyApprovalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
