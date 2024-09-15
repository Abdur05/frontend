import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssementCoursesLevelComponent } from './view-assement-courses-level.component';

describe('ViewAssementCoursesLevelComponent', () => {
  let component: ViewAssementCoursesLevelComponent;
  let fixture: ComponentFixture<ViewAssementCoursesLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssementCoursesLevelComponent]
    });
    fixture = TestBed.createComponent(ViewAssementCoursesLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
