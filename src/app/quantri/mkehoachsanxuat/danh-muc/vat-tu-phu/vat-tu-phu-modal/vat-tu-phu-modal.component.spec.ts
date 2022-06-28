import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatTuPhuModalComponent } from './vat-tu-phu-modal.component';

describe('VatTuPhuModalComponent', () => {
  let component: VatTuPhuModalComponent;
  let fixture: ComponentFixture<VatTuPhuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatTuPhuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatTuPhuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
