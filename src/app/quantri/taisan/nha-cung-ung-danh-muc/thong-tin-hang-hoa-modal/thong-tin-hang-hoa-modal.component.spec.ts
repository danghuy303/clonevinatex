import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinHangHoaModalComponent } from './thong-tin-hang-hoa-modal.component';

describe('ThongTinHangHoaModalComponent', () => {
  let component: ThongTinHangHoaModalComponent;
  let fixture: ComponentFixture<ThongTinHangHoaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinHangHoaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinHangHoaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
