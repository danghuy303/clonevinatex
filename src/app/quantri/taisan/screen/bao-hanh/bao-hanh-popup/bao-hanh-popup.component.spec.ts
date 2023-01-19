import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoHanhPopupComponent } from './bao-hanh-popup.component';

describe('BaoHanhPopupComponent', () => {
  let component: BaoHanhPopupComponent;
  let fixture: ComponentFixture<BaoHanhPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoHanhPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoHanhPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
