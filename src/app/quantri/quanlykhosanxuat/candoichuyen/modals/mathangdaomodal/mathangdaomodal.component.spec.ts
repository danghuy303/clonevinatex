import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathangdaomodalComponent } from './mathangdaomodal.component';

describe('MathangdaomodalComponent', () => {
  let component: MathangdaomodalComponent;
  let fixture: ComponentFixture<MathangdaomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathangdaomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathangdaomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
