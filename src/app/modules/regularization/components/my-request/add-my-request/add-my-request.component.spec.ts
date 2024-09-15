import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyRequestComponent } from './add-my-request.component';

describe('AddMyRequestComponent', () => {
  let component: AddMyRequestComponent;
  let fixture: ComponentFixture<AddMyRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMyRequestComponent]
    });
    fixture = TestBed.createComponent(AddMyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
