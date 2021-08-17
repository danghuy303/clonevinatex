import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonkhohoiamComponent } from './tonkhohoiam.component';

describe('TonkhohoiamComponent', () => {
  let component: TonkhohoiamComponent;
  let fixture: ComponentFixture<TonkhohoiamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhohoiamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhohoiamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
