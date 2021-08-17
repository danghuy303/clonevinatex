import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BongphemathangmodalComponent } from './bongphemathangmodal.component';

describe('BongphemathangmodalComponent', () => {
  let component: BongphemathangmodalComponent;
  let fixture: ComponentFixture<BongphemathangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BongphemathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BongphemathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
