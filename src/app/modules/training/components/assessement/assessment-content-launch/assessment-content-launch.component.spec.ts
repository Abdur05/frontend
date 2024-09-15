import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentContentLaunchComponent } from './assessment-content-launch.component';

describe('AssessmentContentLaunchComponent', () => {
  let component: AssessmentContentLaunchComponent;
  let fixture: ComponentFixture<AssessmentContentLaunchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssessmentContentLaunchComponent]
    });
    fixture = TestBed.createComponent(AssessmentContentLaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
