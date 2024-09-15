import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssetAllocationComponent } from './edit-asset-allocation.component';

describe('EditAssetAllocationComponent', () => {
  let component: EditAssetAllocationComponent;
  let fixture: ComponentFixture<EditAssetAllocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssetAllocationComponent]
    });
    fixture = TestBed.createComponent(EditAssetAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
