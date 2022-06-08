import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonGiaSanPhamModalComponent } from './don-gia-san-pham-modal.component';

describe('DonGiaSanPhamModalComponent', () => {
  let component: DonGiaSanPhamModalComponent;
  let fixture: ComponentFixture<DonGiaSanPhamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonGiaSanPhamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonGiaSanPhamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
