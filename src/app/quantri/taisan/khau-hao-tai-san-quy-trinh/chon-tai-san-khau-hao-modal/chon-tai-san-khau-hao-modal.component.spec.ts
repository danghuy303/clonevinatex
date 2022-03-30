import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonTaiSanKhauHaoModalComponent } from './chon-tai-san-khau-hao-modal.component';

describe('ChonTaiSanKhauHaoModalComponent', () => {
  let component: ChonTaiSanKhauHaoModalComponent;
  let fixture: ComponentFixture<ChonTaiSanKhauHaoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonTaiSanKhauHaoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonTaiSanKhauHaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
