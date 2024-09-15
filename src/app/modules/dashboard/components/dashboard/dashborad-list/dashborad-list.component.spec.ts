import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboradListComponent } from './dashborad-list.component';

describe('DashboradListComponent', () => {
  let component: DashboradListComponent;
  let fixture: ComponentFixture<DashboradListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboradListComponent]
    });
    fixture = TestBed.createComponent(DashboradListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
