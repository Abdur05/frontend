import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecognitionListComponent } from './recognition-list.component';

describe('RecognitionListComponent', () => {
  let component: RecognitionListComponent;
  let fixture: ComponentFixture<RecognitionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecognitionListComponent]
    });
    fixture = TestBed.createComponent(RecognitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
