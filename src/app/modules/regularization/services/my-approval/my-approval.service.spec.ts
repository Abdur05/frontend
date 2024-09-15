import { TestBed } from '@angular/core/testing';

import { MyApprovalService } from './my-approval.service';

describe('MyApprovalService', () => {
  let service: MyApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
