import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PledgeRegisterComponent } from './pledge-register.component';

describe('PledgeRegisterComponent', () => {
  let component: PledgeRegisterComponent;
  let fixture: ComponentFixture<PledgeRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PledgeRegisterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PledgeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
