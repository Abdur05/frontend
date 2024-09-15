import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanRequestComponent } from './add-loan-request.component';

describe('AddLoanRequestComponent', () => {
  let component: AddLoanRequestComponent;
  let fixture: ComponentFixture<AddLoanRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanRequestComponent]
    });
    fixture = TestBed.createComponent(AddLoanRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
