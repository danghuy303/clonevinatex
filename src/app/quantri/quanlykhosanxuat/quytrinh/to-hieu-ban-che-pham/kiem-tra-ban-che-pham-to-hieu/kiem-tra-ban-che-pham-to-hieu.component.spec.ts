import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemTraBanChePhamToHieuComponent } from './kiem-tra-ban-che-pham-to-hieu.component';

describe('KiemTraBanChePhamToHieuComponent', () => {
  let component: KiemTraBanChePhamToHieuComponent;
  let fixture: ComponentFixture<KiemTraBanChePhamToHieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemTraBanChePhamToHieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemTraBanChePhamToHieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
