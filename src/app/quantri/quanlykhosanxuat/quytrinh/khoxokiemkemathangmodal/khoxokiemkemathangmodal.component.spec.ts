import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoxokiemkemathangmodalComponent } from './khoxokiemkemathangmodal.component';

describe('KhoxokiemkemathangmodalComponent', () => {
  let component: KhoxokiemkemathangmodalComponent;
  let fixture: ComponentFixture<KhoxokiemkemathangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoxokiemkemathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoxokiemkemathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
