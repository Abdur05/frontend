import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlideComponent } from './edit-slide.component';

describe('EditSlideComponent', () => {
  let component: EditSlideComponent;
  let fixture: ComponentFixture<EditSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSlideComponent]
    });
    fixture = TestBed.createComponent(EditSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
