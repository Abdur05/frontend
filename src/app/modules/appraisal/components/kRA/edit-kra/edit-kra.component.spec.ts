import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKRAComponent } from './edit-kra.component';

describe('EditKRAComponent', () => {
  let component: EditKRAComponent;
  let fixture: ComponentFixture<EditKRAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditKRAComponent]
    });
    fixture = TestBed.createComponent(EditKRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
