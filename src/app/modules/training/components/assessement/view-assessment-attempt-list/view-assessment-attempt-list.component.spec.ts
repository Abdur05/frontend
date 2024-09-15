import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssessmentAttemptListComponent } from './view-assessment-attempt-list.component';

describe('ViewAssessmentAttemptListComponent', () => {
  let component: ViewAssessmentAttemptListComponent;
  let fixture: ComponentFixture<ViewAssessmentAttemptListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssessmentAttemptListComponent]
    });
    fixture = TestBed.createComponent(ViewAssessmentAttemptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
