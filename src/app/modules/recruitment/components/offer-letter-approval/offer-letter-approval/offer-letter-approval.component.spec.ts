import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferLetterApprovalComponent } from './offer-letter-approval.component';

describe('OfferLetterApprovalComponent', () => {
  let component: OfferLetterApprovalComponent;
  let fixture: ComponentFixture<OfferLetterApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferLetterApprovalComponent]
    });
    fixture = TestBed.createComponent(OfferLetterApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
