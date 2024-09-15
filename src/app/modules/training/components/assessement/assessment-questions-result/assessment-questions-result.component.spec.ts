import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentQuestionsResultComponent } from './assessment-questions-result.component';

describe('AssessmentQuestionsResultComponent', () => {
  let component: AssessmentQuestionsResultComponent;
  let fixture: ComponentFixture<AssessmentQuestionsResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentQuestionsResultComponent]
    });
    fixture = TestBed.createComponent(AssessmentQuestionsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
