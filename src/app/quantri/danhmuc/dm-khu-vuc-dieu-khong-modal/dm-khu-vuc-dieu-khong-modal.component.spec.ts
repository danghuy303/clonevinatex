import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmKhuVucDieuKhongModalComponent } from './dm-khu-vuc-dieu-khong-modal.component';

describe('DmKhuVucDieuKhongModalComponent', () => {
  let component: DmKhuVucDieuKhongModalComponent;
  let fixture: ComponentFixture<DmKhuVucDieuKhongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmKhuVucDieuKhongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmKhuVucDieuKhongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
