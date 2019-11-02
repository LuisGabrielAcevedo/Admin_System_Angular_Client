import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentManagerHeaderComponent } from './document-manager-header.component';

describe('DocumentManagerHeaderComponent', () => {
  let component: DocumentManagerHeaderComponent;
  let fixture: ComponentFixture<DocumentManagerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentManagerHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentManagerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
