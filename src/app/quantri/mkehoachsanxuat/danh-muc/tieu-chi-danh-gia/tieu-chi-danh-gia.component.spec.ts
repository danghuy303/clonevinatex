import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieuChiDanhGiaComponent } from './tieu-chi-danh-gia.component';

describe('TieuChiDanhGiaComponent', () => {
  let component: TieuChiDanhGiaComponent;
  let fixture: ComponentFixture<TieuChiDanhGiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuChiDanhGiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuChiDanhGiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
