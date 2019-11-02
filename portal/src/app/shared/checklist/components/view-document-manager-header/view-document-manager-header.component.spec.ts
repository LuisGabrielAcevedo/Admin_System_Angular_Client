import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentManagerHeaderComponent } from './view-document-manager-header.component';

describe('ViewDocumentManagerHeaderComponent', () => {
  let component: ViewDocumentManagerHeaderComponent;
  let fixture: ComponentFixture<ViewDocumentManagerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocumentManagerHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentManagerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
