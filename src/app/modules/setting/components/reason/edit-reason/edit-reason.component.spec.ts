import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReasonComponent } from './edit-reason.component';

describe('EditReasonComponent', () => {
  let component: EditReasonComponent;
  let fixture: ComponentFixture<EditReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReasonComponent]
    });
    fixture = TestBed.createComponent(EditReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
