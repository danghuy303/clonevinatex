import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MucLuongCoCauNhanSuModalComponent } from './muc-luong-co-cau-nhan-su-modal.component';

describe('MucLuongCoCauNhanSuModalComponent', () => {
  let component: MucLuongCoCauNhanSuModalComponent;
  let fixture: ComponentFixture<MucLuongCoCauNhanSuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MucLuongCoCauNhanSuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MucLuongCoCauNhanSuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
