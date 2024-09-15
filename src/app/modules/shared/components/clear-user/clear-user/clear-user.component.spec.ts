import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearUserComponent } from './clear-user.component';

describe('ClearUserComponent', () => {
  let component: ClearUserComponent;
  let fixture: ComponentFixture<ClearUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClearUserComponent]
    });
    fixture = TestBed.createComponent(ClearUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
