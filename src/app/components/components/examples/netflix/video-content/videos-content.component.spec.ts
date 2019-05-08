import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosContentComponent } from './videos-content.component';

describe('VideosContentComponent', () => {
  let component: VideosContentComponent;
  let fixture: ComponentFixture<VideosContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
