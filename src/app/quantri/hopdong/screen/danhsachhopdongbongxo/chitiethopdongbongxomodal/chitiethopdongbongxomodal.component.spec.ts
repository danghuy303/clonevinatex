import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitiethopdongbongxomodalComponent } from './chitiethopdongbongxomodal.component';

describe('ChitiethopdongbongxomodalComponent', () => {
  let component: ChitiethopdongbongxomodalComponent;
  let fixture: ComponentFixture<ChitiethopdongbongxomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitiethopdongbongxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitiethopdongbongxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
