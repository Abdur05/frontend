import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvancePaymentComponent } from './add-advance-payment.component';

describe('AddAdvancePaymentComponent', () => {
  let component: AddAdvancePaymentComponent;
  let fixture: ComponentFixture<AddAdvancePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdvancePaymentComponent]
    });
    fixture = TestBed.createComponent(AddAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
