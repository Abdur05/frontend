import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAwardComponent } from './add-award.component';

describe('AddAwardComponent', () => {
  let component: AddAwardComponent;
  let fixture: ComponentFixture<AddAwardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAwardComponent]
    });
    fixture = TestBed.createComponent(AddAwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
