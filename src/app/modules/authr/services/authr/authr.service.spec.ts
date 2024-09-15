import { TestBed } from '@angular/core/testing';

import { AuthrService } from './authr.service';

describe('AuthrService', () => {
  let service: AuthrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
