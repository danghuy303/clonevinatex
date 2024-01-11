import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonkhohoiluongdoComponent } from './tonkhohoiluongdo.component';

describe('TonkhohoiluongdoComponent', () => {
  let component: TonkhohoiluongdoComponent;
  let fixture: ComponentFixture<TonkhohoiluongdoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhohoiluongdoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhohoiluongdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
