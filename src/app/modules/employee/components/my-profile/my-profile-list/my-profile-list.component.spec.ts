import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileListComponent } from './my-profile-list.component';

describe('MyProfileListComponent', () => {
  let component: MyProfileListComponent;
  let fixture: ComponentFixture<MyProfileListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProfileListComponent]
    });
    fixture = TestBed.createComponent(MyProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
