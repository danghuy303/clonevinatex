import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TyLeTieuChuanBongPheComponent } from './ty-le-tieu-chuan-bong-phe.component';

describe('TyLeTieuChuanBongPheComponent', () => {
  let component: TyLeTieuChuanBongPheComponent;
  let fixture: ComponentFixture<TyLeTieuChuanBongPheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TyLeTieuChuanBongPheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TyLeTieuChuanBongPheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
