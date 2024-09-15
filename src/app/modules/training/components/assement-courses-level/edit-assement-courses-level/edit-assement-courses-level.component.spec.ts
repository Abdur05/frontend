import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssementCoursesLevelComponent } from './edit-assement-courses-level.component';

describe('EditAssementCoursesLevelComponent', () => {
  let component: EditAssementCoursesLevelComponent;
  let fixture: ComponentFixture<EditAssementCoursesLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssementCoursesLevelComponent]
    });
    fixture = TestBed.createComponent(EditAssementCoursesLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
