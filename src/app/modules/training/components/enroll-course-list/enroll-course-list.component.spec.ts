import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollCourseListComponent } from './enroll-course-list.component';

describe('EnrollCourseListComponent', () => {
  let component: EnrollCourseListComponent;
  let fixture: ComponentFixture<EnrollCourseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollCourseListComponent]
    });
    fixture = TestBed.createComponent(EnrollCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
