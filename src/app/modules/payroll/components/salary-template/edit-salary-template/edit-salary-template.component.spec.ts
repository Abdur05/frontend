import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaryTemplateComponent } from './edit-salary-template.component';

describe('EditSalaryTemplateComponent', () => {
  let component: EditSalaryTemplateComponent;
  let fixture: ComponentFixture<EditSalaryTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSalaryTemplateComponent]
    });
    fixture = TestBed.createComponent(EditSalaryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
