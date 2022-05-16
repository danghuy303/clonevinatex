import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongKeThoiGianDungMayComponent } from './thong-ke-thoi-gian-dung-may.component';

describe('ThongKeThoiGianDungMayComponent', () => {
  let component: ThongKeThoiGianDungMayComponent;
  let fixture: ComponentFixture<ThongKeThoiGianDungMayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongKeThoiGianDungMayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongKeThoiGianDungMayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
