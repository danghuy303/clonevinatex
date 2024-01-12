import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkekhohoiluongdomodalComponent } from './kiemkekhohoiluongdomodal.component';

describe('KiemkekhohoiluongdomodalComponent', () => {
  let component: KiemkekhohoiluongdomodalComponent;
  let fixture: ComponentFixture<KiemkekhohoiluongdomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhohoiluongdomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhohoiluongdomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
