import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaphopdongbongxoComponent } from './laphopdongbongxo.component';

describe('LaphopdongbongxoComponent', () => {
  let component: LaphopdongbongxoComponent;
  let fixture: ComponentFixture<LaphopdongbongxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaphopdongbongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaphopdongbongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
