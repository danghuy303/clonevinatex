import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinHangHoaComponent } from './thong-tin-hang-hoa.component';

describe('ThongTinHangHoaComponent', () => {
  let component: ThongTinHangHoaComponent;
  let fixture: ComponentFixture<ThongTinHangHoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinHangHoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinHangHoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
