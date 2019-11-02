import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChecklistItemComponent } from './view-checklist-item.component';

describe('ViewChecklistItemComponent', () => {
  let component: ViewChecklistItemComponent;
  let fixture: ComponentFixture<ViewChecklistItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewChecklistItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChecklistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
