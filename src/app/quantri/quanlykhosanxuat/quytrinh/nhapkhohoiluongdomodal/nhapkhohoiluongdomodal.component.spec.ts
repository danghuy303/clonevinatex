import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapkhohoiluongdomodalComponent } from './nhapkhohoiluongdomodal.component';

describe('NhapkhohoiluongdomodalComponent', () => {
  let component: NhapkhohoiluongdomodalComponent;
  let fixture: ComponentFixture<NhapkhohoiluongdomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapkhohoiluongdomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapkhohoiluongdomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
