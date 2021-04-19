import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonkhobongxoComponent } from './tonkhobongxo.component';

describe('TonkhobongxoComponent', () => {
  let component: TonkhobongxoComponent;
  let fixture: ComponentFixture<TonkhobongxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
