import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemTraBanChePhamHueComponent } from './kiem-tra-ban-che-pham-hue.component';

describe('KiemTraBanChePhamHueComponent', () => {
  let component: KiemTraBanChePhamHueComponent;
  let fixture: ComponentFixture<KiemTraBanChePhamHueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemTraBanChePhamHueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemTraBanChePhamHueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
