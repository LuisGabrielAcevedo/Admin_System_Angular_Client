import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalHeaderComponent } from './proposal-header.component';

describe('HeaderComponent', () => {
  let component: ProposalHeaderComponent;
  let fixture: ComponentFixture<ProposalHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProposalHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
