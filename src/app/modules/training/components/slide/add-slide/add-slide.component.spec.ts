import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlideComponent } from './add-slide.component';

describe('AddSlideComponent', () => {
  let component: AddSlideComponent;
  let fixture: ComponentFixture<AddSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSlideComponent]
    });
    fixture = TestBed.createComponent(AddSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
