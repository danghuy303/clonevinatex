import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaohiemtaisanComponent } from './baohiemtaisan.component';

describe('BaohiemtaisanComponent', () => {
  let component: BaohiemtaisanComponent;
  let fixture: ComponentFixture<BaohiemtaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaohiemtaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaohiemtaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
