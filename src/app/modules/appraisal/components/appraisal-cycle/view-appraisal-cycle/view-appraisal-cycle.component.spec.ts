import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppraisalCycleComponent } from './view-appraisal-cycle.component';

describe('ViewAppraisalCycleComponent', () => {
  let component: ViewAppraisalCycleComponent;
  let fixture: ComponentFixture<ViewAppraisalCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAppraisalCycleComponent]
    });
    fixture = TestBed.createComponent(ViewAppraisalCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
