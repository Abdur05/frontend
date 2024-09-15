import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobTypeComponent } from './edit-job-type.component';

describe('EditJobTypeComponent', () => {
  let component: EditJobTypeComponent;
  let fixture: ComponentFixture<EditJobTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditJobTypeComponent]
    });
    fixture = TestBed.createComponent(EditJobTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
