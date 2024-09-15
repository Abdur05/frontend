import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyProfileComponent } from './edit-my-profile.component';

describe('EditMyProfileComponent', () => {
  let component: EditMyProfileComponent;
  let fixture: ComponentFixture<EditMyProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMyProfileComponent]
    });
    fixture = TestBed.createComponent(EditMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
