import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKRAComponent } from './add-kra.component';

describe('AddKRAComponent', () => {
  let component: AddKRAComponent;
  let fixture: ComponentFixture<AddKRAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddKRAComponent]
    });
    fixture = TestBed.createComponent(AddKRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
