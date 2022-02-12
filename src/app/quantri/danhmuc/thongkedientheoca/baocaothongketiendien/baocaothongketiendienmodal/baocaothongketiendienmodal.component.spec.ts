import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaothongketiendienmodalComponent } from './baocaothongketiendienmodal.component';

describe('BaocaothongketiendienmodalComponent', () => {
  let component: BaocaothongketiendienmodalComponent;
  let fixture: ComponentFixture<BaocaothongketiendienmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaothongketiendienmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaothongketiendienmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
