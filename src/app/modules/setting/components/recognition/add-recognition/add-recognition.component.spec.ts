import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecognitionComponent } from './add-recognition.component';

describe('AddRecognitionComponent', () => {
  let component: AddRecognitionComponent;
  let fixture: ComponentFixture<AddRecognitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecognitionComponent]
    });
    fixture = TestBed.createComponent(AddRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
