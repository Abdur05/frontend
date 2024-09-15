import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyApprovalComponent } from './add-my-approval.component';

describe('AddMyApprovalComponent', () => {
  let component: AddMyApprovalComponent;
  let fixture: ComponentFixture<AddMyApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMyApprovalComponent]
    });
    fixture = TestBed.createComponent(AddMyApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
