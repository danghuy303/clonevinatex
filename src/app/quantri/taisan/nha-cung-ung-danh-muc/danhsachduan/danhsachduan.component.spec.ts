import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachduanComponent } from './danhsachduan.component';

describe('DanhsachduanComponent', () => {
  let component: DanhsachduanComponent;
  let fixture: ComponentFixture<DanhsachduanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachduanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachduanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
