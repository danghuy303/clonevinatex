import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangThaiBaoLanhComponent } from './trang-thai-bao-lanh.component';

describe('TrangThaiBaoLanhComponent', () => {
  let component: TrangThaiBaoLanhComponent;
  let fixture: ComponentFixture<TrangThaiBaoLanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangThaiBaoLanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangThaiBaoLanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
