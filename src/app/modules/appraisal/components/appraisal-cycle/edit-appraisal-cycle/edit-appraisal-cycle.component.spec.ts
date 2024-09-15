import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppraisalCycleComponent } from './edit-appraisal-cycle.component';

describe('EditAppraisalCycleComponent', () => {
  let component: EditAppraisalCycleComponent;
  let fixture: ComponentFixture<EditAppraisalCycleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppraisalCycleComponent]
    });
    fixture = TestBed.createComponent(EditAppraisalCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
