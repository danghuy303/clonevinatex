import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BangGiaVtpComponent } from './bang-gia-vtp.component';

describe('BangGiaVtpComponent', () => {
  let component: BangGiaVtpComponent;
  let fixture: ComponentFixture<BangGiaVtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BangGiaVtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BangGiaVtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
