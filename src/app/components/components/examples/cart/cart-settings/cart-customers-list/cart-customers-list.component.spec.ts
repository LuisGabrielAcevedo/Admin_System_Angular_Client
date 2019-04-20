import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCustomersListComponent } from './cart-customers-list.component';

describe('CartCustomersListComponent', () => {
  let component: CartCustomersListComponent;
  let fixture: ComponentFixture<CartCustomersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartCustomersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
