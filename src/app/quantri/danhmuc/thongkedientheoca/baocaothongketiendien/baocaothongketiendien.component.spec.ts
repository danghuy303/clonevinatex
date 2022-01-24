import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaothongketiendienComponent } from './baocaothongketiendien.component';

describe('BaocaothongketiendienComponent', () => {
  let component: BaocaothongketiendienComponent;
  let fixture: ComponentFixture<BaocaothongketiendienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaothongketiendienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaothongketiendienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
