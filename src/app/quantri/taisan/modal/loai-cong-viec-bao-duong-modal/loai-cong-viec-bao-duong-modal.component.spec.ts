import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiCongViecBaoDuongModalComponent } from './loai-cong-viec-bao-duong-modal.component';

describe('LoaiCongViecBaoDuongModalComponent', () => {
  let component: LoaiCongViecBaoDuongModalComponent;
  let fixture: ComponentFixture<LoaiCongViecBaoDuongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiCongViecBaoDuongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiCongViecBaoDuongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
