import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatKhoGiaCongComponent } from './xuat-kho-gia-cong.component';

describe('XuatKhoGiaCongComponent', () => {
  let component: XuatKhoGiaCongComponent;
  let fixture: ComponentFixture<XuatKhoGiaCongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatKhoGiaCongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatKhoGiaCongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
