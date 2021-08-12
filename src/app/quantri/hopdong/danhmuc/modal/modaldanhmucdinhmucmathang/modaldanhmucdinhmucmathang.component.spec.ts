import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmucdinhmucmathangComponent } from './modaldanhmucdinhmucmathang.component';

describe('ModaldanhmucdinhmucmathangComponent', () => {
  let component: ModaldanhmucdinhmucmathangComponent;
  let fixture: ComponentFixture<ModaldanhmucdinhmucmathangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucdinhmucmathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucdinhmucmathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
