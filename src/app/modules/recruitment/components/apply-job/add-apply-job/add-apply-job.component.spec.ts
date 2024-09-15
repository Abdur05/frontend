import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplyJobComponent } from './add-apply-job.component';

describe('AddApplyJobComponent', () => {
  let component: AddApplyJobComponent;
  let fixture: ComponentFixture<AddApplyJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApplyJobComponent]
    });
    fixture = TestBed.createComponent(AddApplyJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
