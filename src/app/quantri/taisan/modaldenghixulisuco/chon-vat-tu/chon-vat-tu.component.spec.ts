import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonVatTuComponent } from './chon-vat-tu.component';

describe('ChonVatTuComponent', () => {
  let component: ChonVatTuComponent;
  let fixture: ComponentFixture<ChonVatTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonVatTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonVatTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
