import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDecEmployeeListComponent } from './tax-dec-employee-list.component';

describe('TaxDecEmployeeListComponent', () => {
  let component: TaxDecEmployeeListComponent;
  let fixture: ComponentFixture<TaxDecEmployeeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxDecEmployeeListComponent]
    });
    fixture = TestBed.createComponent(TaxDecEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
