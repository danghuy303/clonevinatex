import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmHeThongDieuKhongModalComponent } from './dm-he-thong-dieu-khong-modal.component';

describe('DmHeThongDieuKhongModalComponent', () => {
  let component: DmHeThongDieuKhongModalComponent;
  let fixture: ComponentFixture<DmHeThongDieuKhongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmHeThongDieuKhongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmHeThongDieuKhongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
