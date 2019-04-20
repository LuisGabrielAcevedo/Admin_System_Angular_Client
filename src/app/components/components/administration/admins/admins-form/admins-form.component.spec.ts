import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsFormComponent } from './admins-form.component';

describe('AdminsFormComponent', () => {
  let component: AdminsFormComponent;
  let fixture: ComponentFixture<AdminsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
