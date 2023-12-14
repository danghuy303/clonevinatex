import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonVatTuThayTheComponent } from './chon-vat-tu-thay-the.component';

describe('ChonVatTuThayTheComponent', () => {
  let component: ChonVatTuThayTheComponent;
  let fixture: ComponentFixture<ChonVatTuThayTheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonVatTuThayTheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonVatTuThayTheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
