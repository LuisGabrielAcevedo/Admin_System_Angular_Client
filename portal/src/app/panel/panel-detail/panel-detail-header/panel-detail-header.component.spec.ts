import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDetailHeaderComponent } from './panel-detail-header.component';

describe('HeaderComponent', () => {
  let component: PanelDetailHeaderComponent;
  let fixture: ComponentFixture<PanelDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanelDetailHeaderComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
