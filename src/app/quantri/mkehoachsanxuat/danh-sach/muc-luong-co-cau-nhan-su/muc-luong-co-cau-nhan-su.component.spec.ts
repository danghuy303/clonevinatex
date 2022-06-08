import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MucLuongCoCauNhanSuComponent } from './muc-luong-co-cau-nhan-su.component';

describe('MucLuongCoCauNhanSuComponent', () => {
  let component: MucLuongCoCauNhanSuComponent;
  let fixture: ComponentFixture<MucLuongCoCauNhanSuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MucLuongCoCauNhanSuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MucLuongCoCauNhanSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
