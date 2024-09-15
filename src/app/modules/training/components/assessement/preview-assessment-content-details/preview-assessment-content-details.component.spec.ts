import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAssessmentContentDetailsComponent } from './preview-assessment-content-details.component';

describe('PreviewAssessmentContentDetailsComponent', () => {
  let component: PreviewAssessmentContentDetailsComponent;
  let fixture: ComponentFixture<PreviewAssessmentContentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewAssessmentContentDetailsComponent]
    });
    fixture = TestBed.createComponent(PreviewAssessmentContentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
