import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietKiemKhoVatTuComponent } from './chi-tiet-kiem-kho-vat-tu.component';

describe('ChiTietKiemKhoVatTuComponent', () => {
  let component: ChiTietKiemKhoVatTuComponent;
  let fixture: ComponentFixture<ChiTietKiemKhoVatTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietKiemKhoVatTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietKiemKhoVatTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
