import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPdfFileComponent } from './view-pdf-file.component';

describe('ViewPdfFileComponent', () => {
  let component: ViewPdfFileComponent;
  let fixture: ComponentFixture<ViewPdfFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPdfFileComponent]
    });
    fixture = TestBed.createComponent(ViewPdfFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
