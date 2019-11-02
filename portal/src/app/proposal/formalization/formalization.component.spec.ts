import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormalizationComponent } from './formalization.component';

describe('FormalizationComponent', () => {
  let component: FormalizationComponent;
  let fixture: ComponentFixture<FormalizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormalizationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
