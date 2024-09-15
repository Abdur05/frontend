import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAllocationListComponent } from './asset-allocation-list.component';

describe('AssetAllocationListComponent', () => {
  let component: AssetAllocationListComponent;
  let fixture: ComponentFixture<AssetAllocationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetAllocationListComponent]
    });
    fixture = TestBed.createComponent(AssetAllocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
