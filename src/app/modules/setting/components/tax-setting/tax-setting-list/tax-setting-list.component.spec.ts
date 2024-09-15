import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxSettingListComponent } from './tax-setting-list.component';

describe('TaxSettingListComponent', () => {
  let component: TaxSettingListComponent;
  let fixture: ComponentFixture<TaxSettingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxSettingListComponent]
    });
    fixture = TestBed.createComponent(TaxSettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
