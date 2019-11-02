import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoesNotWorkComponent } from './does-not-work.component';

describe('DoesNotWorkComponent', () => {
  let component: DoesNotWorkComponent;
  let fixture: ComponentFixture<DoesNotWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoesNotWorkComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoesNotWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
