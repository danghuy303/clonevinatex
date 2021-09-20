import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphibanhangtheonamComponent } from './chiphibanhangtheonam.component';

describe('ChiphibanhangtheonamComponent', () => {
  let component: ChiphibanhangtheonamComponent;
  let fixture: ComponentFixture<ChiphibanhangtheonamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphibanhangtheonamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphibanhangtheonamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
