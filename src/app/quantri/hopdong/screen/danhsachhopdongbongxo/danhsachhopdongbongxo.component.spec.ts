import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhopdongbongxoComponent } from './danhsachhopdongbongxo.component';

describe('DanhsachhopdongbongxoComponent', () => {
  let component: DanhsachhopdongbongxoComponent;
  let fixture: ComponentFixture<DanhsachhopdongbongxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongbongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongbongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
