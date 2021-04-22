import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TonkhobonghoimodalComponent } from './tonkhobonghoimodal.component';

describe('TonkhobonghoimodalComponent', () => {
  let component: TonkhobonghoimodalComponent;
  let fixture: ComponentFixture<TonkhobonghoimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TonkhobonghoimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TonkhobonghoimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
