import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuChuyenTaiSanComponent } from './dieu-chuyen-tai-san.component';

describe('DieuChuyenTaiSanComponent', () => {
  let component: DieuChuyenTaiSanComponent;
  let fixture: ComponentFixture<DieuChuyenTaiSanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuChuyenTaiSanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuChuyenTaiSanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
