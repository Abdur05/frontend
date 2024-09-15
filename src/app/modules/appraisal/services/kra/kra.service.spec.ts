import { TestBed } from '@angular/core/testing';

import { KraService } from './kra.service';

describe('KraService', () => {
  let service: KraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
