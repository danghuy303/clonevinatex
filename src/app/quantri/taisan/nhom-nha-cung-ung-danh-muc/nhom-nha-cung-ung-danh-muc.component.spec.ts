import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhomNhaCungUngDanhMucComponent } from './nhom-nha-cung-ung-danh-muc.component';

describe('NhomNhaCungUngDanhMucComponent', () => {
  let component: NhomNhaCungUngDanhMucComponent;
  let fixture: ComponentFixture<NhomNhaCungUngDanhMucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhomNhaCungUngDanhMucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhomNhaCungUngDanhMucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
