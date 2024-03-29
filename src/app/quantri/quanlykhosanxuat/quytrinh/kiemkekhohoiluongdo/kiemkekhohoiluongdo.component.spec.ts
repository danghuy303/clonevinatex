import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemkekhohoiluongdoComponent } from './kiemkekhohoiluongdo.component';

describe('KiemkekhohoiluongdoComponent', () => {
  let component: KiemkekhohoiluongdoComponent;
  let fixture: ComponentFixture<KiemkekhohoiluongdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemkekhohoiluongdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemkekhohoiluongdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
