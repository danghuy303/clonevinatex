import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonkhobongphemodalComponent } from './tonkhobongphemodal.component';

describe('TonkhobongphemodalComponent', () => {
  let component: TonkhobongphemodalComponent;
  let fixture: ComponentFixture<TonkhobongphemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobongphemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobongphemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
