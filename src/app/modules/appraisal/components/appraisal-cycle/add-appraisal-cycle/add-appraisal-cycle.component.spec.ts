import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppraisalCycleComponent } from './add-appraisal-cycle.component';

describe('AddAppraisalCycleComponent', () => {
  let component: AddAppraisalCycleComponent;
  let fixture: ComponentFixture<AddAppraisalCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppraisalCycleComponent]
    });
    fixture = TestBed.createComponent(AddAppraisalCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
