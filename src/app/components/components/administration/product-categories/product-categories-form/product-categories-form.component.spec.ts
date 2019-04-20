import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoriesFormComponent } from './product-categories-form.component';

describe('ProductCategoriesFormComponent', () => {
  let component: ProductCategoriesFormComponent;
  let fixture: ComponentFixture<ProductCategoriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
