import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonkhobongxomodalComponent } from './tonkhobongxomodal.component';

describe('TonkhobongxomodalComponent', () => {
  let component: TonkhobongxomodalComponent;
  let fixture: ComponentFixture<TonkhobongxomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobongxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobongxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
