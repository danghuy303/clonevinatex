import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemKeBanChePhamHueModalComponent } from './kiem-ke-ban-che-pham-hue-modal.component';

describe('KiemKeBanChePhamHueModalComponent', () => {
  let component: KiemKeBanChePhamHueModalComponent;
  let fixture: ComponentFixture<KiemKeBanChePhamHueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemKeBanChePhamHueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemKeBanChePhamHueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
