import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxDeclarationListComponent } from './tax-declaration-list.component';

describe('TaxDeclarationListComponent', () => {
  let component: TaxDeclarationListComponent;
  let fixture: ComponentFixture<TaxDeclarationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxDeclarationListComponent]
    });
    fixture = TestBed.createComponent(TaxDeclarationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
