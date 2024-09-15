import { TestBed } from '@angular/core/testing';

import { WeeklyOffDaysService } from './weekly-off-days.service';

describe('WeeklyOffDaysService', () => {
  let service: WeeklyOffDaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeeklyOffDaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
