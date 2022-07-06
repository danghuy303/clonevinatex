import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaSanPhamTheoThangComponent } from './gia-san-pham-theo-thang.component';

describe('GiaSanPhamTheoThangComponent', () => {
  let component: GiaSanPhamTheoThangComponent;
  let fixture: ComponentFixture<GiaSanPhamTheoThangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaSanPhamTheoThangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaSanPhamTheoThangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
