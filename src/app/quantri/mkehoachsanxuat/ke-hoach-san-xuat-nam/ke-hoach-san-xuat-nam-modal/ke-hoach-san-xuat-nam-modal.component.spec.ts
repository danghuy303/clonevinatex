import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeHoachSanXuatNamModalComponent } from './ke-hoach-san-xuat-nam-modal.component';

describe('KeHoachSanXuatNamModalComponent', () => {
  let component: KeHoachSanXuatNamModalComponent;
  let fixture: ComponentFixture<KeHoachSanXuatNamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeHoachSanXuatNamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeHoachSanXuatNamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
