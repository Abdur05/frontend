import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSlideComponent } from './preview-slide.component';

describe('PreviewSlideComponent', () => {
  let component: PreviewSlideComponent;
  let fixture: ComponentFixture<PreviewSlideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewSlideComponent]
    });
    fixture = TestBed.createComponent(PreviewSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
