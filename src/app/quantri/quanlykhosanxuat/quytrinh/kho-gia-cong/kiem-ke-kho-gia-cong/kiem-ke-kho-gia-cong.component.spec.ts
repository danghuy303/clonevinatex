import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemKeKhoGiaCongComponent } from './kiem-ke-kho-gia-cong.component';

describe('KiemKeKhoGiaCongComponent', () => {
  let component: KiemKeKhoGiaCongComponent;
  let fixture: ComponentFixture<KiemKeKhoGiaCongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemKeKhoGiaCongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemKeKhoGiaCongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
