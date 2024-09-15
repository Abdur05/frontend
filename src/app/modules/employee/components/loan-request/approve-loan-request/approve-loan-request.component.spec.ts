import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLoanRequestComponent } from './approve-loan-request.component';

describe('ApproveLoanRequestComponent', () => {
  let component: ApproveLoanRequestComponent;
  let fixture: ComponentFixture<ApproveLoanRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveLoanRequestComponent]
    });
    fixture = TestBed.createComponent(ApproveLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
