import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuckhocungungmodalComponent } from './danhmuckhocungungmodal.component';

describe('DanhmuckhocungungmodalComponent', () => {
  let component: DanhmuckhocungungmodalComponent;
  let fixture: ComponentFixture<DanhmuckhocungungmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuckhocungungmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuckhocungungmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
