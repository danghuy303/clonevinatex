import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonkhohoiammodalComponent } from './tonkhohoiammodal.component';

describe('TonkhohoiammodalComponent', () => {
  let component: TonkhohoiammodalComponent;
  let fixture: ComponentFixture<TonkhohoiammodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhohoiammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhohoiammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
