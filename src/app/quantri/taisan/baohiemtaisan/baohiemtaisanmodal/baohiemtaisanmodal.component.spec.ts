import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaohiemtaisanmodalComponent } from './baohiemtaisanmodal.component';

describe('BaohiemtaisanmodalComponent', () => {
  let component: BaohiemtaisanmodalComponent;
  let fixture: ComponentFixture<BaohiemtaisanmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaohiemtaisanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaohiemtaisanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
