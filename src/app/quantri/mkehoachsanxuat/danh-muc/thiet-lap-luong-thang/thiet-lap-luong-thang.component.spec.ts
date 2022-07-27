import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThietLapLuongThangComponent } from './thiet-lap-luong-thang.component';

describe('ThietLapLuongThangComponent', () => {
  let component: ThietLapLuongThangComponent;
  let fixture: ComponentFixture<ThietLapLuongThangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThietLapLuongThangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThietLapLuongThangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
