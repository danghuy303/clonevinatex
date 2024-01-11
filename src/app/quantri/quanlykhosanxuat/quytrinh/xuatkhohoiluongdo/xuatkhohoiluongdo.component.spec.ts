import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhohoiluongdoComponent } from './xuatkhohoiluongdo.component';

describe('XuatkhohoiluongdoComponent', () => {
  let component: XuatkhohoiluongdoComponent;
  let fixture: ComponentFixture<XuatkhohoiluongdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhohoiluongdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhohoiluongdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
