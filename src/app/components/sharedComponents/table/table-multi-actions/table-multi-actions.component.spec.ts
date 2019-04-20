import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMultiActionsComponent } from './table-multi-actions.component';

describe('TableMultiActionsComponent', () => {
  let component: TableMultiActionsComponent;
  let fixture: ComponentFixture<TableMultiActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableMultiActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMultiActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
