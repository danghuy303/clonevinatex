import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucQrComponent } from './danh-muc-qr.component';

describe('DanhMucQrComponent', () => {
  let component: DanhMucQrComponent;
  let fixture: ComponentFixture<DanhMucQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhMucQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
