import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhoxomathangmodalComponent } from './xuatkhoxomathangmodal.component';

describe('XuatkhoxomathangmodalComponent', () => {
  let component: XuatkhoxomathangmodalComponent;
  let fixture: ComponentFixture<XuatkhoxomathangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhoxomathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhoxomathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
