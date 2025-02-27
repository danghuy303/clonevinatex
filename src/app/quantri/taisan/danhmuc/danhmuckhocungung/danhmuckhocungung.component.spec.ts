import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuckhocungungComponent } from './danhmuckhocungung.component';

describe('DanhmuckhocungungComponent', () => {
  let component: DanhmuckhocungungComponent;
  let fixture: ComponentFixture<DanhmuckhocungungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuckhocungungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuckhocungungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
