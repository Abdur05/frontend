import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreOnBoardingListComponent } from './pre-on-boarding-list.component';

describe('PreOnBoardingListComponent', () => {
  let component: PreOnBoardingListComponent;
  let fixture: ComponentFixture<PreOnBoardingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreOnBoardingListComponent]
    });
    fixture = TestBed.createComponent(PreOnBoardingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
