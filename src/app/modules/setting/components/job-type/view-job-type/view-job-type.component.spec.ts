import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobTypeComponent } from './view-job-type.component';

describe('ViewJobTypeComponent', () => {
  let component: ViewJobTypeComponent;
  let fixture: ComponentFixture<ViewJobTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewJobTypeComponent]
    });
    fixture = TestBed.createComponent(ViewJobTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
