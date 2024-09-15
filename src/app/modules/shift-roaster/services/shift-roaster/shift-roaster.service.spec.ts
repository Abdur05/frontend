import { TestBed } from '@angular/core/testing';

import { ShiftRoasterService } from './shift-roaster.service';

describe('ShiftRoasterService', () => {
  let service: ShiftRoasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftRoasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
