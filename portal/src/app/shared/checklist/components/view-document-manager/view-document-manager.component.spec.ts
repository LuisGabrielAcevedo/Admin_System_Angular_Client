import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocumentManagerComponent } from './view-document-manager.component';

describe('ViewDocumentManagerComponent', () => {
  let component: ViewDocumentManagerComponent;
  let fixture: ComponentFixture<ViewDocumentManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDocumentManagerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
