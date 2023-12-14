import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatKhoVatTuComponent } from './xuat-kho-vat-tu.component';

describe('XuatKhoVatTuComponent', () => {
  let component: XuatKhoVatTuComponent;
  let fixture: ComponentFixture<XuatKhoVatTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatKhoVatTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatKhoVatTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
