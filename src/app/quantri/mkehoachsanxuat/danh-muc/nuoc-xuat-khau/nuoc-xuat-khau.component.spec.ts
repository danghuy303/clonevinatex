import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuocXuatKhauComponent } from './nuoc-xuat-khau.component';

describe('NuocXuatKhauComponent', () => {
  let component: NuocXuatKhauComponent;
  let fixture: ComponentFixture<NuocXuatKhauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuocXuatKhauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuocXuatKhauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
