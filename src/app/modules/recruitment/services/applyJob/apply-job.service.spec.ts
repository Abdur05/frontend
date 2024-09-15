import { TestBed } from '@angular/core/testing';

import { ApplyJobService } from './apply-job.service';

describe('ApplyJobService', () => {
  let service: ApplyJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
