import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTypeListComponent } from './job-type-list.component';

describe('JobTypeListComponent', () => {
  let component: JobTypeListComponent;
  let fixture: ComponentFixture<JobTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobTypeListComponent]
    });
    fixture = TestBed.createComponent(JobTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
