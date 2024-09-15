import { TestBed } from '@angular/core/testing';

import { MedicalQuestionService } from './medical-question.service';

describe('MedicalQuestionService', () => {
  let service: MedicalQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
