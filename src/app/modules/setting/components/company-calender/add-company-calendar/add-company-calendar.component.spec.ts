import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyCalendarComponent } from './add-company-calendar.component';

describe('AddCompanyCalendarComponent', () => {
  let component: AddCompanyCalendarComponent;
  let fixture: ComponentFixture<AddCompanyCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompanyCalendarComponent]
    });
    fixture = TestBed.createComponent(AddCompanyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
