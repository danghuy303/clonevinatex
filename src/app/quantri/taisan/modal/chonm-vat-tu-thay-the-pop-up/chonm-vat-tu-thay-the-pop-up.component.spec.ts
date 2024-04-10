import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonmVatTuThayThePopUpComponent } from './chonm-vat-tu-thay-the-pop-up.component';

describe('ChonmVatTuThayThePopUpComponent', () => {
  let component: ChonmVatTuThayThePopUpComponent;
  let fixture: ComponentFixture<ChonmVatTuThayThePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonmVatTuThayThePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonmVatTuThayThePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
