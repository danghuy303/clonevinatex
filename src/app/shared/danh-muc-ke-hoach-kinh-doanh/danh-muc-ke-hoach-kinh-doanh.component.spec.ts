import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucKeHoachKinhDoanhComponent } from './danh-muc-ke-hoach-kinh-doanh.component';

describe('DanhMucKeHoachKinhDoanhComponent', () => {
  let component: DanhMucKeHoachKinhDoanhComponent;
  let fixture: ComponentFixture<DanhMucKeHoachKinhDoanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhMucKeHoachKinhDoanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucKeHoachKinhDoanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
