import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaryComponentComponent } from './edit-salary-component.component';

describe('EditSalaryComponentComponent', () => {
  let component: EditSalaryComponentComponent;
  let fixture: ComponentFixture<EditSalaryComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSalaryComponentComponent]
    });
    fixture = TestBed.createComponent(EditSalaryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
