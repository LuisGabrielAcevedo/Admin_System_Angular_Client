import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalContainerComponent } from './proposal-container.component';

describe('ProposalContainerComponent', () => {
  let component: ProposalContainerComponent;
  let fixture: ComponentFixture<ProposalContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
