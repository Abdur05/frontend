import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCalendarListComponent } from './company-calendar-list.component';

describe('CompanyCalendarListComponent', () => {
  let component: CompanyCalendarListComponent;
  let fixture: ComponentFixture<CompanyCalendarListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyCalendarListComponent]
    });
    fixture = TestBed.createComponent(CompanyCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
