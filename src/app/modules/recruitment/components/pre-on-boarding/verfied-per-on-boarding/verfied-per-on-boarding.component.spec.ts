import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiedPerOnBoardingComponent } from './verfied-per-on-boarding.component';

describe('VerfiedPerOnBoardingComponent', () => {
  let component: VerfiedPerOnBoardingComponent;
  let fixture: ComponentFixture<VerfiedPerOnBoardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerfiedPerOnBoardingComponent]
    });
    fixture = TestBed.createComponent(VerfiedPerOnBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
