import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmKiemKeBanChePhamComponent } from './dm-kiem-ke-ban-che-pham.component';

describe('DmKiemKeBanChePhamComponent', () => {
  let component: DmKiemKeBanChePhamComponent;
  let fixture: ComponentFixture<DmKiemKeBanChePhamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmKiemKeBanChePhamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmKiemKeBanChePhamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
