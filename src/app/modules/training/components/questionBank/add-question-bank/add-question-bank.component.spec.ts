import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionBankComponent } from './add-question-bank.component';

describe('AddQuestionBankComponent', () => {
  let component: AddQuestionBankComponent;
  let fixture: ComponentFixture<AddQuestionBankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionBankComponent]
    });
    fixture = TestBed.createComponent(AddQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
