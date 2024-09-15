import { TestBed } from '@angular/core/testing';

import { CompanyCalenderService } from './company-calender.service';

describe('CompanyCalenderService', () => {
  let service: CompanyCalenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyCalenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
