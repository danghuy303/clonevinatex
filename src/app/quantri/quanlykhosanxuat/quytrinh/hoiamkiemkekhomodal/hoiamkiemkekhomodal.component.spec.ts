import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoiamkiemkekhomodalComponent } from './hoiamkiemkekhomodal.component';

describe('HoiamkiemkekhomodalComponent', () => {
  let component: HoiamkiemkekhomodalComponent;
  let fixture: ComponentFixture<HoiamkiemkekhomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoiamkiemkekhomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoiamkiemkekhomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
