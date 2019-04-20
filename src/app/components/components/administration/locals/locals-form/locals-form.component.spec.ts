import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalsFormComponent } from './locals-form.component';

describe('LocalsFormComponent', () => {
  let component: LocalsFormComponent;
  let fixture: ComponentFixture<LocalsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
