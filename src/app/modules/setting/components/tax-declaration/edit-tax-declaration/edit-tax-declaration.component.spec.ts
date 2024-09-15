import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxDeclarationComponent } from './edit-tax-declaration.component';

describe('EditTaxDeclarationComponent', () => {
  let component: EditTaxDeclarationComponent;
  let fixture: ComponentFixture<EditTaxDeclarationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaxDeclarationComponent]
    });
    fixture = TestBed.createComponent(EditTaxDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
