import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnriComponent } from './enri.component';

describe('EnriComponent', () => {
  let component: EnriComponent;
  let fixture: ComponentFixture<EnriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnriComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
