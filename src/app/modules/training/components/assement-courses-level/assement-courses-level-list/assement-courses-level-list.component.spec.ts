import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssementCoursesLevelListComponent } from './assement-courses-level-list.component';

describe('AssementCoursesLevelListComponent', () => {
  let component: AssementCoursesLevelListComponent;
  let fixture: ComponentFixture<AssementCoursesLevelListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssementCoursesLevelListComponent]
    });
    fixture = TestBed.createComponent(AssementCoursesLevelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
