import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageableRejectionComponent } from './manageable-rejection.component';

describe('ManageableRejectionComponent', () => {
  let component: ManageableRejectionComponent;
  let fixture: ComponentFixture<ManageableRejectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageableRejectionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageableRejectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
