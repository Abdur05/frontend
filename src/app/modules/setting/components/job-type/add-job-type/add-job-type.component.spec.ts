import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobTypeComponent } from './add-job-type.component';

describe('AddJobTypeComponent', () => {
  let component: AddJobTypeComponent;
  let fixture: ComponentFixture<AddJobTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddJobTypeComponent]
    });
    fixture = TestBed.createComponent(AddJobTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
