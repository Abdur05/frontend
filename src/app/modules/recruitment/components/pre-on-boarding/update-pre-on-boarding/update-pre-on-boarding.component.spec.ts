import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreOnBoardingComponent } from './update-pre-on-boarding.component';

describe('UpdatePreOnBoardingComponent', () => {
  let component: UpdatePreOnBoardingComponent;
  let fixture: ComponentFixture<UpdatePreOnBoardingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePreOnBoardingComponent]
    });
    fixture = TestBed.createComponent(UpdatePreOnBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
