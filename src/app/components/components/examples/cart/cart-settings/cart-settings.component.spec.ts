import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSettingsComponent } from './cart-settings.component';

describe('CartSettingsComponent', () => {
  let component: CartSettingsComponent;
  let fixture: ComponentFixture<CartSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
