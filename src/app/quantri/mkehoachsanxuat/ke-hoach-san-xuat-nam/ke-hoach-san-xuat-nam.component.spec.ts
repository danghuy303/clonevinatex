import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachSanXuatNamComponent } from './ke-hoach-san-xuat-nam.component';

describe('KeHoachSanXuatNamComponent', () => {
  let component: KeHoachSanXuatNamComponent;
  let fixture: ComponentFixture<KeHoachSanXuatNamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachSanXuatNamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachSanXuatNamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
