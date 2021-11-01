import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TinhdoanhthumodalComponent } from './tinhdoanhthumodal.component';

describe('TinhdoanhthumodalComponent', () => {
  let component: TinhdoanhthumodalComponent;
  let fixture: ComponentFixture<TinhdoanhthumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TinhdoanhthumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinhdoanhthumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
