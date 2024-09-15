import { TestBed } from '@angular/core/testing';

import { MarkAttendanceService } from './mark-attendance.service';

describe('MarkAttendanceService', () => {
  let service: MarkAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
