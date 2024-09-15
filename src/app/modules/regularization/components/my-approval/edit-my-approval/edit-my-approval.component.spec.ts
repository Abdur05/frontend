import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyApprovalComponent } from './edit-my-approval.component';

describe('EditMyApprovalComponent', () => {
  let component: EditMyApprovalComponent;
  let fixture: ComponentFixture<EditMyApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMyApprovalComponent]
    });
    fixture = TestBed.createComponent(EditMyApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
