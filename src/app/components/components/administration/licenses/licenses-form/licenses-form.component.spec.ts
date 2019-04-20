import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensesFormComponent } from './licenses-form.component';

describe('LicensesFormComponent', () => {
  let component: LicensesFormComponent;
  let fixture: ComponentFixture<LicensesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
