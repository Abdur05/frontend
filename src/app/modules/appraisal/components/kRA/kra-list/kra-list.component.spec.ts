import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KRAListComponent } from './kra-list.component';

describe('KRAListComponent', () => {
  let component: KRAListComponent;
  let fixture: ComponentFixture<KRAListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KRAListComponent]
    });
    fixture = TestBed.createComponent(KRAListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
