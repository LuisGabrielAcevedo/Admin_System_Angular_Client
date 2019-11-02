import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasMenuComponent } from './canvas-menu.component';

describe('ZoomControlComponent', () => {
  let component: CanvasMenuComponent;
  let fixture: ComponentFixture<CanvasMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
