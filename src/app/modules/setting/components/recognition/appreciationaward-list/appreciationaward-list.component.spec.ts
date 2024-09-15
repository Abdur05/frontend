import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppreciationawardListComponent } from './appreciationaward-list.component';

describe('AppreciationawardListComponent', () => {
  let component: AppreciationawardListComponent;
  let fixture: ComponentFixture<AppreciationawardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppreciationawardListComponent]
    });
    fixture = TestBed.createComponent(AppreciationawardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
