import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAssessmentAlertMessageComponent } from './preview-assessment-alert-message.component';

describe('PreviewAssessmentAlertMessageComponent', () => {
  let component: PreviewAssessmentAlertMessageComponent;
  let fixture: ComponentFixture<PreviewAssessmentAlertMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewAssessmentAlertMessageComponent]
    });
    fixture = TestBed.createComponent(PreviewAssessmentAlertMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
