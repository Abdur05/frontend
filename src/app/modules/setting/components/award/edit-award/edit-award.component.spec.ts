import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAwardComponent } from './edit-award.component';

describe('EditAwardComponent', () => {
  let component: EditAwardComponent;
  let fixture: ComponentFixture<EditAwardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAwardComponent]
    });
    fixture = TestBed.createComponent(EditAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
