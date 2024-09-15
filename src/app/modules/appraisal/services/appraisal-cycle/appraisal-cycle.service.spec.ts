import { TestBed } from '@angular/core/testing';

import { AppraisalCycleService } from './appraisal-cycle.service';

describe('AppraisalCycleService', () => {
  let service: AppraisalCycleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraisalCycleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
