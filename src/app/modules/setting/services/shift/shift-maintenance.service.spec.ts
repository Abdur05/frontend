import { TestBed } from '@angular/core/testing';

import { ShiftMaintenanceService } from './shift-maintenance.service';

describe('ShiftMaintenanceService', () => {
  let service: ShiftMaintenanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftMaintenanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
