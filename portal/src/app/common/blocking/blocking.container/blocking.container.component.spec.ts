import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockingContainerComponent } from './blocking.container.component';

describe('Blocking.ContainerComponent', () => {
  let component: BlockingContainerComponent;
  let fixture: ComponentFixture<BlockingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlockingContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
