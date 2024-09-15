import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEarningComponent } from './create-earning.component';

describe('CreateEarningComponent', () => {
  let component: CreateEarningComponent;
  let fixture: ComponentFixture<CreateEarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEarningComponent]
    });
    fixture = TestBed.createComponent(CreateEarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
