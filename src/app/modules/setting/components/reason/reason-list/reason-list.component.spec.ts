import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonListComponent } from './reason-list.component';

describe('ReasonListComponent', () => {
  let component: ReasonListComponent;
  let fixture: ComponentFixture<ReasonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReasonListComponent]
    });
    fixture = TestBed.createComponent(ReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
