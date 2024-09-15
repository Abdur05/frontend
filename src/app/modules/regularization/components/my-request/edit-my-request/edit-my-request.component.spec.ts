import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyRequestComponent } from './edit-my-request.component';

describe('EditMyRequestComponent', () => {
  let component: EditMyRequestComponent;
  let fixture: ComponentFixture<EditMyRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMyRequestComponent]
    });
    fixture = TestBed.createComponent(EditMyRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
