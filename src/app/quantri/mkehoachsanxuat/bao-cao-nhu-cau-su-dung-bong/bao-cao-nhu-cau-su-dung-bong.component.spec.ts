import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoCaoNhuCauSuDungBongComponent } from './bao-cao-nhu-cau-su-dung-bong.component';

describe('BaoCaoNhuCauSuDungBongComponent', () => {
  let component: BaoCaoNhuCauSuDungBongComponent;
  let fixture: ComponentFixture<BaoCaoNhuCauSuDungBongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoCaoNhuCauSuDungBongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoCaoNhuCauSuDungBongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
