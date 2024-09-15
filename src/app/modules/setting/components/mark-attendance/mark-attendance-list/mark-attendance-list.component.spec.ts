import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAttendanceListComponent } from './mark-attendance-list.component';

describe('MarkAttendanceListComponent', () => {
  let component: MarkAttendanceListComponent;
  let fixture: ComponentFixture<MarkAttendanceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkAttendanceListComponent]
    });
    fixture = TestBed.createComponent(MarkAttendanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
