import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarkAttendanceComponent } from './add-mark-attendance.component';

describe('AddMarkAttendanceComponent', () => {
  let component: AddMarkAttendanceComponent;
  let fixture: ComponentFixture<AddMarkAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMarkAttendanceComponent]
    });
    fixture = TestBed.createComponent(AddMarkAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
