import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucmathangComponent } from './danhmucmathang.component';

describe('DanhmucmathangComponent', () => {
  let component: DanhmucmathangComponent;
  let fixture: ComponentFixture<DanhmucmathangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucmathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucmathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
