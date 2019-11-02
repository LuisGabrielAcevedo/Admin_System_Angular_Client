import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagerPagesComponent } from './document-manager-pages.component';

describe('DocumentManagerPagesComponent', () => {
  let component: DocumentManagerPagesComponent;
  let fixture: ComponentFixture<DocumentManagerPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentManagerPagesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentManagerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
