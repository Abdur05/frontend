import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaveTypeComponent } from './edit-leave-type.component';

describe('EditLeaveTypeComponent', () => {
  let component: EditLeaveTypeComponent;
  let fixture: ComponentFixture<EditLeaveTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditLeaveTypeComponent]
    });
    fixture = TestBed.createComponent(EditLeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
