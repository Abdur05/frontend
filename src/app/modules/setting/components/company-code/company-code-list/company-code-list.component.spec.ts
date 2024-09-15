import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCodeListComponent } from './company-code-list.component';

describe('CompanyCodeListComponent', () => {
  let component: CompanyCodeListComponent;
  let fixture: ComponentFixture<CompanyCodeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyCodeListComponent]
    });
    fixture = TestBed.createComponent(CompanyCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
