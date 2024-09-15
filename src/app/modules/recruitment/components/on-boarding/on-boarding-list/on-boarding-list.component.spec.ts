import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingListComponent } from './on-boarding-list.component';

describe('OnBoardingListComponent', () => {
  let component: OnBoardingListComponent;
  let fixture: ComponentFixture<OnBoardingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnBoardingListComponent]
    });
    fixture = TestBed.createComponent(OnBoardingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
