import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmKhuVucDieuKhongComponent } from './dm-khu-vuc-dieu-khong.component';

describe('DmKhuVucDieuKhongComponent', () => {
  let component: DmKhuVucDieuKhongComponent;
  let fixture: ComponentFixture<DmKhuVucDieuKhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmKhuVucDieuKhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmKhuVucDieuKhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
