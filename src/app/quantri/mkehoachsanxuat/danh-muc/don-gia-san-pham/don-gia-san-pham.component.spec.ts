import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonGiaSanPhamComponent } from './don-gia-san-pham.component';

describe('DonGiaSanPhamComponent', () => {
  let component: DonGiaSanPhamComponent;
  let fixture: ComponentFixture<DonGiaSanPhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonGiaSanPhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonGiaSanPhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
