import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPayslipComponent } from './get-payslip.component';

describe('GetPayslipComponent', () => {
  let component: GetPayslipComponent;
  let fixture: ComponentFixture<GetPayslipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetPayslipComponent]
    });
    fixture = TestBed.createComponent(GetPayslipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
