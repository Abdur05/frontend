import { TestBed } from '@angular/core/testing';

import { AssementCoursesLevelService } from './assement-courses-level.service';

describe('AssementCoursesLevelService', () => {
  let service: AssementCoursesLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssementCoursesLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
