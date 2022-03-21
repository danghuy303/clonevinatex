import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieuChiDanhGiaNhaComponent } from './tieu-chi-danh-gia-nha.component';

describe('TieuChiDanhGiaNhaComponent', () => {
  let component: TieuChiDanhGiaNhaComponent;
  let fixture: ComponentFixture<TieuChiDanhGiaNhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuChiDanhGiaNhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuChiDanhGiaNhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
