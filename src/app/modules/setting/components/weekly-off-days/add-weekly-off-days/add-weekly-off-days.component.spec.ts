import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeeklyOffDaysComponent } from './add-weekly-off-days.component';

describe('AddWeeklyOffDaysComponent', () => {
  let component: AddWeeklyOffDaysComponent;
  let fixture: ComponentFixture<AddWeeklyOffDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWeeklyOffDaysComponent]
    });
    fixture = TestBed.createComponent(AddWeeklyOffDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
