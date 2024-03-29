import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonVatTuPopupComponent } from './chon-vat-tu-popup.component';

describe('ChonVatTuPopupComponent', () => {
  let component: ChonVatTuPopupComponent;
  let fixture: ComponentFixture<ChonVatTuPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonVatTuPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonVatTuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
