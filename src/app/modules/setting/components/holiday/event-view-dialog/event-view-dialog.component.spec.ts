import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewDialogComponent } from './event-view-dialog.component';

describe('EventViewDialogComponent', () => {
  let component: EventViewDialogComponent;
  let fixture: ComponentFixture<EventViewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventViewDialogComponent]
    });
    fixture = TestBed.createComponent(EventViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
