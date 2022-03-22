import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinDanhGiaNcuComponent } from './thong-tin-danh-gia-ncu.component';

describe('ThongTinDanhGiaNcuComponent', () => {
  let component: ThongTinDanhGiaNcuComponent;
  let fixture: ComponentFixture<ThongTinDanhGiaNcuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongTinDanhGiaNcuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinDanhGiaNcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
