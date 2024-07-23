import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachKeHoachNamComponent } from './danh-sach-ke-hoach-nam.component';

describe('DanhSachKeHoachNamComponent', () => {
  let component: DanhSachKeHoachNamComponent;
  let fixture: ComponentFixture<DanhSachKeHoachNamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachKeHoachNamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachKeHoachNamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
