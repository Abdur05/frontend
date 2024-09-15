import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetAllocationComponent } from './add-asset-allocation.component';

describe('AddAssetAllocationComponent', () => {
  let component: AddAssetAllocationComponent;
  let fixture: ComponentFixture<AddAssetAllocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssetAllocationComponent]
    });
    fixture = TestBed.createComponent(AddAssetAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
