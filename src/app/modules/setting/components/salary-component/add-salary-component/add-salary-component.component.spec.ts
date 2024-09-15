import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryComponentComponent } from './add-salary-component.component';

describe('AddSalaryComponentComponent', () => {
  let component: AddSalaryComponentComponent;
  let fixture: ComponentFixture<AddSalaryComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSalaryComponentComponent]
    });
    fixture = TestBed.createComponent(AddSalaryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
