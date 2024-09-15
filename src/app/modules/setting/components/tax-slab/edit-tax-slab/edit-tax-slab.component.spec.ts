import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxSlabComponent } from './edit-tax-slab.component';

describe('EditTaxSlabComponent', () => {
  let component: EditTaxSlabComponent;
  let fixture: ComponentFixture<EditTaxSlabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaxSlabComponent]
    });
    fixture = TestBed.createComponent(EditTaxSlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
