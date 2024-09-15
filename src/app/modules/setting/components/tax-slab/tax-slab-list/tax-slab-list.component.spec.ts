import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSlabListComponent } from './tax-slab-list.component';

describe('TaxSlabListComponent', () => {
  let component: TaxSlabListComponent;
  let fixture: ComponentFixture<TaxSlabListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxSlabListComponent]
    });
    fixture = TestBed.createComponent(TaxSlabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
