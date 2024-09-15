import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTaxSubListComponent } from './review-tax-sub-list.component';

describe('ReviewTaxSubListComponent', () => {
  let component: ReviewTaxSubListComponent;
  let fixture: ComponentFixture<ReviewTaxSubListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewTaxSubListComponent]
    });
    fixture = TestBed.createComponent(ReviewTaxSubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
