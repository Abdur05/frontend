import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyCodeComponent } from './edit-company-code.component';

describe('EditCompanyCodeComponent', () => {
  let component: EditCompanyCodeComponent;
  let fixture: ComponentFixture<EditCompanyCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCompanyCodeComponent]
    });
    fixture = TestBed.createComponent(EditCompanyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
