import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucdinhmucmathangComponent } from './danhmucdinhmucmathang.component';

describe('DanhmucdinhmucmathangComponent', () => {
  let component: DanhmucdinhmucmathangComponent;
  let fixture: ComponentFixture<DanhmucdinhmucmathangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucdinhmucmathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucdinhmucmathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
