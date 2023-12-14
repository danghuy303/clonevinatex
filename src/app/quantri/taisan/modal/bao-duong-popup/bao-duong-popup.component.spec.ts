import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaoDuongPopupComponent } from './bao-duong-popup.component';

describe('BaoDuongPopupComponent', () => {
  let component: BaoDuongPopupComponent;
  let fixture: ComponentFixture<BaoDuongPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaoDuongPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaoDuongPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
