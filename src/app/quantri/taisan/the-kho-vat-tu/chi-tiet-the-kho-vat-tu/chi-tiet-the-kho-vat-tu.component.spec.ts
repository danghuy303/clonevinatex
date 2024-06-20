import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietTheKhoVatTuComponent } from './chi-tiet-the-kho-vat-tu.component';

describe('ChiTietTheKhoVatTuComponent', () => {
  let component: ChiTietTheKhoVatTuComponent;
  let fixture: ComponentFixture<ChiTietTheKhoVatTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietTheKhoVatTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietTheKhoVatTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
