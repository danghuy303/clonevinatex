import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiamkiemkekhoComponent } from './hoiamkiemkekho.component';

describe('HoiamkiemkekhoComponent', () => {
  let component: HoiamkiemkekhoComponent;
  let fixture: ComponentFixture<HoiamkiemkekhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiamkiemkekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiamkiemkekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
