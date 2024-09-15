import { TestBed } from '@angular/core/testing';

import { Form16Service } from './form16.service';

describe('Form16Service', () => {
  let service: Form16Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Form16Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
