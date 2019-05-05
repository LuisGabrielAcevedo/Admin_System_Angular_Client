import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableApplicationTypeComponent } from './table-application-type.component';

describe('TableApplicationTypeComponent', () => {
  let component: TableApplicationTypeComponent;
  let fixture: ComponentFixture<TableApplicationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableApplicationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableApplicationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
