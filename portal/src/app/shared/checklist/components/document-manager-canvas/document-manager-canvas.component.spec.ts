import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagerCanvasComponent } from './document-manager-canvas.component';

describe('DocumentManagerCanvasComponent', () => {
  let component: DocumentManagerCanvasComponent;
  let fixture: ComponentFixture<DocumentManagerCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentManagerCanvasComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentManagerCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
