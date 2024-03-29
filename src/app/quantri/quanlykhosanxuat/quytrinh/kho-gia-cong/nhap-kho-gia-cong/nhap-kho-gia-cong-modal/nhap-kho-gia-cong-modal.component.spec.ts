import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapKhoGiaCongModalComponent } from './nhap-kho-gia-cong-modal.component';

describe('NhapKhoGiaCongModalComponent', () => {
  let component: NhapKhoGiaCongModalComponent;
  let fixture: ComponentFixture<NhapKhoGiaCongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapKhoGiaCongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapKhoGiaCongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
