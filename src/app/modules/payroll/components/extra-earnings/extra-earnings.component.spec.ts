import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraEarningsComponent } from './extra-earnings.component';

describe('ExtraEarningsComponent', () => {
  let component: ExtraEarningsComponent;
  let fixture: ComponentFixture<ExtraEarningsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraEarningsComponent]
    });
    fixture = TestBed.createComponent(ExtraEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
