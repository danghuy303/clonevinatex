import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonkhohoiluongdomodalComponent } from './tonkhohoiluongdomodal.component';

describe('TonkhohoiluongdomodalComponent', () => {
  let component: TonkhohoiluongdomodalComponent;
  let fixture: ComponentFixture<TonkhohoiluongdomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhohoiluongdomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhohoiluongdomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
