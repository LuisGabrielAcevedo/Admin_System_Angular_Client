import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFavoriteProductsListComponent } from './cart-favorite-products-list.component';

describe('CartFavoriteProductsListComponent', () => {
  let component: CartFavoriteProductsListComponent;
  let fixture: ComponentFixture<CartFavoriteProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartFavoriteProductsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartFavoriteProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
