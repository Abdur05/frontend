import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancePaymentListComponent } from './advance-payment-list.component';

describe('AdvancePaymentListComponent', () => {
  let component: AdvancePaymentListComponent;
  let fixture: ComponentFixture<AdvancePaymentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancePaymentListComponent]
    });
    fixture = TestBed.createComponent(AdvancePaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
