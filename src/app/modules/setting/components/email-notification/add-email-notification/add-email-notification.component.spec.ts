import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailNotificationComponent } from './add-email-notification.component';

describe('AddEmailNotificationComponent', () => {
  let component: AddEmailNotificationComponent;
  let fixture: ComponentFixture<AddEmailNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEmailNotificationComponent]
    });
    fixture = TestBed.createComponent(AddEmailNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
