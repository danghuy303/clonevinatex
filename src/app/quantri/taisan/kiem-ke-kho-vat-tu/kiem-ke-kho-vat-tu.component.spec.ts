import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemKeKhoVatTuComponent } from './kiem-ke-kho-vat-tu.component';

describe('KiemKeKhoVatTuComponent', () => {
  let component: KiemKeKhoVatTuComponent;
  let fixture: ComponentFixture<KiemKeKhoVatTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemKeKhoVatTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemKeKhoVatTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
