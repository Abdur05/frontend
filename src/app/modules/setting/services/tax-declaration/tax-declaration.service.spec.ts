import { TestBed } from '@angular/core/testing';

import { TaxDeclarationService } from './tax-declaration.service';

describe('TaxDeclarationService', () => {
  let service: TaxDeclarationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxDeclarationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
