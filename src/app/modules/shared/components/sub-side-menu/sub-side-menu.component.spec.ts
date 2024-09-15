import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSideMenuComponent } from './sub-side-menu.component';

describe('SubSideMenuComponent', () => {
  let component: SubSideMenuComponent;
  let fixture: ComponentFixture<SubSideMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubSideMenuComponent]
    });
    fixture = TestBed.createComponent(SubSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
