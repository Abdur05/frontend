import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyRequestComponent } from './view-my-request.component';

describe('ViewMyRequestComponent', () => {
  let component: ViewMyRequestComponent;
  let fixture: ComponentFixture<ViewMyRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMyRequestComponent]
    });
    fixture = TestBed.createComponent(ViewMyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
