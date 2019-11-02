import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyRelationshipComponent } from './dependency-relationship.component';

describe('DependencyRelationshipComponent', () => {
  let component: DependencyRelationshipComponent;
  let fixture: ComponentFixture<DependencyRelationshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DependencyRelationshipComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyRelationshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
