import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemKeKhoGiaCongModalComponent } from './kiem-ke-kho-gia-cong-modal.component';

describe('KiemKeKhoGiaCongModalComponent', () => {
  let component: KiemKeKhoGiaCongModalComponent;
  let fixture: ComponentFixture<KiemKeKhoGiaCongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemKeKhoGiaCongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemKeKhoGiaCongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
