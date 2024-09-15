import { TestBed } from '@angular/core/testing';

import { LoanApproveConfigService } from './loan-approve-config.service';

describe('LoanApproveConfigService', () => {
  let service: LoanApproveConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoanApproveConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
