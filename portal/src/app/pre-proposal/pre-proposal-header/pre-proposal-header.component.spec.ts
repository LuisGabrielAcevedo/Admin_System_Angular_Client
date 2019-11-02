import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreProposalHeaderComponent } from './pre-proposal-header.component';

describe('HeaderComponent', () => {
  let component: PreProposalHeaderComponent;
  let fixture: ComponentFixture<PreProposalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreProposalHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreProposalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
