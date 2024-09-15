import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalCycleListComponent } from './appraisal-cycle-list.component';

describe('AppraisalCycleListComponent', () => {
  let component: AppraisalCycleListComponent;
  let fixture: ComponentFixture<AppraisalCycleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppraisalCycleListComponent]
    });
    fixture = TestBed.createComponent(AppraisalCycleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
