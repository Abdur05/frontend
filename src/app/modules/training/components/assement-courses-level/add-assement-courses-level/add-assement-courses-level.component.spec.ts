import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssementCoursesLevelComponent } from './add-assement-courses-level.component';

describe('AddAssementCoursesLevelComponent', () => {
  let component: AddAssementCoursesLevelComponent;
  let fixture: ComponentFixture<AddAssementCoursesLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAssementCoursesLevelComponent]
    });
    fixture = TestBed.createComponent(AddAssementCoursesLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
