import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotificationListComponent } from './email-notification-list.component';

describe('EmailNotificationListComponent', () => {
  let component: EmailNotificationListComponent;
  let fixture: ComponentFixture<EmailNotificationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailNotificationListComponent]
    });
    fixture = TestBed.createComponent(EmailNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
