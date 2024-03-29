import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatKhoGiaCongModalComponent } from './xuat-kho-gia-cong-modal.component';

describe('XuatKhoGiaCongModalComponent', () => {
  let component: XuatKhoGiaCongModalComponent;
  let fixture: ComponentFixture<XuatKhoGiaCongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatKhoGiaCongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatKhoGiaCongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
