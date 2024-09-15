import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPreOnBoardingComponent } from './salary-pre-on-boarding.component';

describe('SalaryPreOnBoardingComponent', () => {
  let component: SalaryPreOnBoardingComponent;
  let fixture: ComponentFixture<SalaryPreOnBoardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryPreOnBoardingComponent]
    });
    fixture = TestBed.createComponent(SalaryPreOnBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
