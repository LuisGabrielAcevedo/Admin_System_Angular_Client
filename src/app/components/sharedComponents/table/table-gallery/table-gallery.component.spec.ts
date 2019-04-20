import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGalleryComponent } from './table-gallery.component';

describe('TableGalleryComponent', () => {
  let component: TableGalleryComponent;
  let fixture: ComponentFixture<TableGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
