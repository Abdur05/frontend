import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdvancePaymentComponent } from './edit-advance-payment.component';

describe('EditAdvancePaymentComponent', () => {
  let component: EditAdvancePaymentComponent;
  let fixture: ComponentFixture<EditAdvancePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdvancePaymentComponent]
    });
    fixture = TestBed.createComponent(EditAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
