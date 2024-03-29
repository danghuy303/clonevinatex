import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemTraBanChePhamToHieuModalComponent } from './kiem-tra-ban-che-pham-to-hieu-modal.component';

describe('KiemTraBanChePhamToHieuModalComponent', () => {
  let component: KiemTraBanChePhamToHieuModalComponent;
  let fixture: ComponentFixture<KiemTraBanChePhamToHieuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemTraBanChePhamToHieuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemTraBanChePhamToHieuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
