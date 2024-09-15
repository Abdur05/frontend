import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishCourseListComponent } from './publish-course-list.component';

describe('PublishCourseListComponent', () => {
  let component: PublishCourseListComponent;
  let fixture: ComponentFixture<PublishCourseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishCourseListComponent]
    });
    fixture = TestBed.createComponent(PublishCourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
