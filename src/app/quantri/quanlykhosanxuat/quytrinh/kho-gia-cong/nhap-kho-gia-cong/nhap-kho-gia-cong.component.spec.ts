import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapKhoGiaCongComponent } from './nhap-kho-gia-cong.component';

describe('NhapKhoGiaCongComponent', () => {
  let component: NhapKhoGiaCongComponent;
  let fixture: ComponentFixture<NhapKhoGiaCongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapKhoGiaCongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapKhoGiaCongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
