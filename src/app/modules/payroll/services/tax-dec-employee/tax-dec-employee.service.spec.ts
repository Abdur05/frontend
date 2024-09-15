import { TestBed } from '@angular/core/testing';

import { TaxDecEmployeeService } from './tax-dec-employee.service';

describe('TaxDecEmployeeService', () => {
  let service: TaxDecEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxDecEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
