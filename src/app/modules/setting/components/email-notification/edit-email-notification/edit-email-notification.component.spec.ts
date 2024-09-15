import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailNotificationComponent } from './edit-email-notification.component';

describe('EditEmailNotificationComponent', () => {
  let component: EditEmailNotificationComponent;
  let fixture: ComponentFixture<EditEmailNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEmailNotificationComponent]
    });
    fixture = TestBed.createComponent(EditEmailNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
