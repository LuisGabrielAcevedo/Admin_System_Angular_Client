import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoOwnerComponent } from './co-owner.component';

describe('CoOwnerComponent', () => {
  let component: CoOwnerComponent;
  let fixture: ComponentFixture<CoOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoOwnerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
