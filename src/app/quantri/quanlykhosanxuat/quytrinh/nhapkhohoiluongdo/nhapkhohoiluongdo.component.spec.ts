import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhohoiluongdoComponent } from './nhapkhohoiluongdo.component';

describe('NhapkhohoiluongdoComponent', () => {
  let component: NhapkhohoiluongdoComponent;
  let fixture: ComponentFixture<NhapkhohoiluongdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhohoiluongdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhohoiluongdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
