import { TestBed } from '@angular/core/testing';

import { CompanyCodeService } from './company-code.service';

describe('CompanyCodeService', () => {
  let service: CompanyCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
