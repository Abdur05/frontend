import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppreciationNoteComponent } from './edit-appreciation-note.component';

describe('EditAppreciationNoteComponent', () => {
  let component: EditAppreciationNoteComponent;
  let fixture: ComponentFixture<EditAppreciationNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAppreciationNoteComponent]
    });
    fixture = TestBed.createComponent(EditAppreciationNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
