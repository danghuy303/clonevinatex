import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoTongHopLoiCatComponent } from './bao-cao-tong-hop-loi-cat.component';

describe('BaoCaoTongHopLoiCatComponent', () => {
  let component: BaoCaoTongHopLoiCatComponent;
  let fixture: ComponentFixture<BaoCaoTongHopLoiCatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoTongHopLoiCatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoTongHopLoiCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
