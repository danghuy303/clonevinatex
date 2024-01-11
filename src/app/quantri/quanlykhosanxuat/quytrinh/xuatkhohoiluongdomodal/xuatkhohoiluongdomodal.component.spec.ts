import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhohoiluongdomodalComponent } from './xuatkhohoiluongdomodal.component';

describe('XuatkhohoiluongdomodalComponent', () => {
  let component: XuatkhohoiluongdomodalComponent;
  let fixture: ComponentFixture<XuatkhohoiluongdomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhohoiluongdomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhohoiluongdomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
