import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewTaxSubComponent } from './view-review-tax-sub.component';

describe('ViewReviewTaxSubComponent', () => {
  let component: ViewReviewTaxSubComponent;
  let fixture: ComponentFixture<ViewReviewTaxSubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReviewTaxSubComponent]
    });
    fixture = TestBed.createComponent(ViewReviewTaxSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
