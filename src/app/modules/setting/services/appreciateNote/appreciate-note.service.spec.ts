import { TestBed } from '@angular/core/testing';

import { AppreciateNoteService } from './appreciate-note.service';

describe('AppreciateNoteService', () => {
  let service: AppreciateNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppreciateNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
