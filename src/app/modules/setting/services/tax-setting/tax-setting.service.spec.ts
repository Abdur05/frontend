import { TestBed } from '@angular/core/testing';

import { TaxSettingService } from './tax-setting.service';

describe('TaxSettingService', () => {
  let service: TaxSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
