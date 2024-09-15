import { TestBed } from '@angular/core/testing';

import { ExtraEarningService } from './extra-earning.service';

describe('ExtraEarningService', () => {
  let service: ExtraEarningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraEarningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
