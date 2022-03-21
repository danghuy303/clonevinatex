import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieuChiDanhGiaModalComponent } from './tieu-chi-danh-gia-modal.component';

describe('TieuChiDanhGiaModalComponent', () => {
  let component: TieuChiDanhGiaModalComponent;
  let fixture: ComponentFixture<TieuChiDanhGiaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuChiDanhGiaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuChiDanhGiaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
