import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingProfileDetailsComponent } from './on-boarding-profile-details.component';

describe('OnBoardingProfileDetailsComponent', () => {
  let component: OnBoardingProfileDetailsComponent;
  let fixture: ComponentFixture<OnBoardingProfileDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnBoardingProfileDetailsComponent]
    });
    fixture = TestBed.createComponent(OnBoardingProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
