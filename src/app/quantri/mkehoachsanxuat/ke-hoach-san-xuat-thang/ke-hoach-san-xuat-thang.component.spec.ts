import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachSanXuatThangComponent } from './ke-hoach-san-xuat-thang.component';

describe('KeHoachSanXuatThangComponent', () => {
  let component: KeHoachSanXuatThangComponent;
  let fixture: ComponentFixture<KeHoachSanXuatThangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachSanXuatThangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachSanXuatThangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
