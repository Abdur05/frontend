import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPolicyComponent } from './edit-policy.component';

describe('EditPolicyComponent', () => {
  let component: EditPolicyComponent;
  let fixture: ComponentFixture<EditPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPolicyComponent]
    });
    fixture = TestBed.createComponent(EditPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
