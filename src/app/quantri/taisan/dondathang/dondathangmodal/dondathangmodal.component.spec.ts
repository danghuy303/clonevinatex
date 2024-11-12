import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DondathangmodalComponent } from './dondathangmodal.component';

describe('DondathangmodalComponent', () => {
  let component: DondathangmodalComponent;
  let fixture: ComponentFixture<DondathangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DondathangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DondathangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
