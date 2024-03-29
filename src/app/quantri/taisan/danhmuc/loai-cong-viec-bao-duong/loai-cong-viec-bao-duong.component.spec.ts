import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiCongViecBaoDuongComponent } from './loai-cong-viec-bao-duong.component';

describe('LoaiCongViecBaoDuongComponent', () => {
  let component: LoaiCongViecBaoDuongComponent;
  let fixture: ComponentFixture<LoaiCongViecBaoDuongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiCongViecBaoDuongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiCongViecBaoDuongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
