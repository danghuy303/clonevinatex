import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaSanPhamTheoThangModalComponent } from './gia-san-pham-theo-thang-modal.component';

describe('GiaSanPhamTheoThangModalComponent', () => {
  let component: GiaSanPhamTheoThangModalComponent;
  let fixture: ComponentFixture<GiaSanPhamTheoThangModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaSanPhamTheoThangModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaSanPhamTheoThangModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
