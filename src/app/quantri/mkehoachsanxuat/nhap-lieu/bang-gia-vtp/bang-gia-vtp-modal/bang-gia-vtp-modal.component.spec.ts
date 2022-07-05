import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangGiaVtpModalComponent } from './bang-gia-vtp-modal.component';

describe('BangGiaVtpModalComponent', () => {
  let component: BangGiaVtpModalComponent;
  let fixture: ComponentFixture<BangGiaVtpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangGiaVtpModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangGiaVtpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
