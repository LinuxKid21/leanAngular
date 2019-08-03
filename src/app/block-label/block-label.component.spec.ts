import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLabelComponent } from './block-label.component';

describe('BlockLabelComponent', () => {
  let component: BlockLabelComponent;
  let fixture: ComponentFixture<BlockLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
