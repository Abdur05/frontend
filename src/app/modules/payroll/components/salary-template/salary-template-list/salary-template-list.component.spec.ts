import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryTemplateListComponent } from './salary-template-list.component';

describe('SalaryTemplateListComponent', () => {
  let component: SalaryTemplateListComponent;
  let fixture: ComponentFixture<SalaryTemplateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryTemplateListComponent]
    });
    fixture = TestBed.createComponent(SalaryTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
