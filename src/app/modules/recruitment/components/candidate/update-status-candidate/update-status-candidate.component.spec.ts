import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusCandidateComponent } from './update-status-candidate.component';

describe('UpdateStatusCandidateComponent', () => {
  let component: UpdateStatusCandidateComponent;
  let fixture: ComponentFixture<UpdateStatusCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStatusCandidateComponent]
    });
    fixture = TestBed.createComponent(UpdateStatusCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
