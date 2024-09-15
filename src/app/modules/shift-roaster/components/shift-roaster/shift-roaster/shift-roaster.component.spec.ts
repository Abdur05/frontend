import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRoasterComponent } from './shift-roaster.component';

describe('ShiftRoasterComponent', () => {
  let component: ShiftRoasterComponent;
  let fixture: ComponentFixture<ShiftRoasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftRoasterComponent]
    });
    fixture = TestBed.createComponent(ShiftRoasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
