import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChinhsuadanhgiakhachhangmodalComponent } from './chinhsuadanhgiakhachhangmodal.component';

describe('ChinhsuadanhgiakhachhangmodalComponent', () => {
  let component: ChinhsuadanhgiakhachhangmodalComponent;
  let fixture: ComponentFixture<ChinhsuadanhgiakhachhangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChinhsuadanhgiakhachhangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChinhsuadanhgiakhachhangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
