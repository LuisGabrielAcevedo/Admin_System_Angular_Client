import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentManagerCanvasComponent } from './view-document-manager-canvas.component';

describe('ViewDocumentManagerCanvasComponent', () => {
  let component: ViewDocumentManagerCanvasComponent;
  let fixture: ComponentFixture<ViewDocumentManagerCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocumentManagerCanvasComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentManagerCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
