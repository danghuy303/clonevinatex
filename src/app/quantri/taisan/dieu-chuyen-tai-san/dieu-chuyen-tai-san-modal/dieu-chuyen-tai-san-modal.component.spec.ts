import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieuChuyenTaiSanModalComponent } from './dieu-chuyen-tai-san-modal.component';

describe('DieuChuyenTaiSanModalComponent', () => {
  let component: DieuChuyenTaiSanModalComponent;
  let fixture: ComponentFixture<DieuChuyenTaiSanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieuChuyenTaiSanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieuChuyenTaiSanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
