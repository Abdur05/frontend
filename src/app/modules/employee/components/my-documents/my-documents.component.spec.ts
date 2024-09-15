import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocumentsComponent } from './my-documents.component';

describe('MyDocumentsComponent', () => {
  let component: MyDocumentsComponent;
  let fixture: ComponentFixture<MyDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDocumentsComponent]
    });
    fixture = TestBed.createComponent(MyDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
