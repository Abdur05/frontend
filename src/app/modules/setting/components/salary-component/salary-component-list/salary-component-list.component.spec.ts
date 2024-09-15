import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryComponentListComponent } from './salary-component-list.component';

describe('SalaryComponentListComponent', () => {
  let component: SalaryComponentListComponent;
  let fixture: ComponentFixture<SalaryComponentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryComponentListComponent]
    });
    fixture = TestBed.createComponent(SalaryComponentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
