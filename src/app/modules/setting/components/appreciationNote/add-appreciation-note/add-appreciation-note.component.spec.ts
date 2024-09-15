import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppreciationNoteComponent } from './add-appreciation-note.component';

describe('AddAppreciationNoteComponent', () => {
  let component: AddAppreciationNoteComponent;
  let fixture: ComponentFixture<AddAppreciationNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppreciationNoteComponent]
    });
    fixture = TestBed.createComponent(AddAppreciationNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
