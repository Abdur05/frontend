import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequestListComponent } from './my-request-list.component';

describe('MyRequestListComponent', () => {
  let component: MyRequestListComponent;
  let fixture: ComponentFixture<MyRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyRequestListComponent]
    });
    fixture = TestBed.createComponent(MyRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
