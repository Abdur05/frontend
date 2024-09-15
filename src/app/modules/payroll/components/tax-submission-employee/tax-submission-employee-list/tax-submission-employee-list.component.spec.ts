import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSubmissionEmployeeListComponent } from './tax-submission-employee-list.component';

describe('TaxSubmissionEmployeeListComponent', () => {
  let component: TaxSubmissionEmployeeListComponent;
  let fixture: ComponentFixture<TaxSubmissionEmployeeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxSubmissionEmployeeListComponent]
    });
    fixture = TestBed.createComponent(TaxSubmissionEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
