import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatbongtheohopdongComponent } from './xuatbongtheohopdong.component';

describe('XuatbongtheohopdongComponent', () => {
  let component: XuatbongtheohopdongComponent;
  let fixture: ComponentFixture<XuatbongtheohopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatbongtheohopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatbongtheohopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
