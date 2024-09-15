import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InprogressCourseListComponent } from './inprogress-course-list.component';

describe('InprogressCourseListComponent', () => {
  let component: InprogressCourseListComponent;
  let fixture: ComponentFixture<InprogressCourseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InprogressCourseListComponent]
    });
    fixture = TestBed.createComponent(InprogressCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
