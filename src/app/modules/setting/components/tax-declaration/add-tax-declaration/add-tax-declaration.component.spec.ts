import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxDeclarationComponent } from './add-tax-declaration.component';

describe('AddTaxDeclarationComponent', () => {
  let component: AddTaxDeclarationComponent;
  let fixture: ComponentFixture<AddTaxDeclarationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaxDeclarationComponent]
    });
    fixture = TestBed.createComponent(AddTaxDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
