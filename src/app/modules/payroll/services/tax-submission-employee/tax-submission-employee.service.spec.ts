import { TestBed } from '@angular/core/testing';

import { TaxSubmissionEmployeeService } from './tax-submission-employee.service';

describe('TaxSubmissionEmployeeService', () => {
  let service: TaxSubmissionEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxSubmissionEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
