import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppreciationNoteListComponent } from './appreciation-note-list.component';

describe('AppreciationNoteListComponent', () => {
  let component: AppreciationNoteListComponent;
  let fixture: ComponentFixture<AppreciationNoteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppreciationNoteListComponent]
    });
    fixture = TestBed.createComponent(AppreciationNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
