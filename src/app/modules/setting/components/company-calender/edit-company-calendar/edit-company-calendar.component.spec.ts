import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyCalendarComponent } from './edit-company-calendar.component';

describe('EditCompanyCalendarComponent', () => {
  let component: EditCompanyCalendarComponent;
  let fixture: ComponentFixture<EditCompanyCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCompanyCalendarComponent]
    });
    fixture = TestBed.createComponent(EditCompanyCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
