import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxSlabComponent } from './add-tax-slab.component';

describe('AddTaxSlabComponent', () => {
  let component: AddTaxSlabComponent;
  let fixture: ComponentFixture<AddTaxSlabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaxSlabComponent]
    });
    fixture = TestBed.createComponent(AddTaxSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
