import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCourseContentComponent } from './preview-course-content.component';

describe('PreviewCourseContentComponent', () => {
  let component: PreviewCourseContentComponent;
  let fixture: ComponentFixture<PreviewCourseContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewCourseContentComponent]
    });
    fixture = TestBed.createComponent(PreviewCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
