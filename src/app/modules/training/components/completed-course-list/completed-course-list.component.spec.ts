import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCourseListComponent } from './completed-course-list.component';

describe('CompletedCourseListComponent', () => {
  let component: CompletedCourseListComponent;
  let fixture: ComponentFixture<CompletedCourseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedCourseListComponent]
    });
    fixture = TestBed.createComponent(CompletedCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
