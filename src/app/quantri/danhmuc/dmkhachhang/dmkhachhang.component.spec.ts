import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmkhachhangComponent } from './dmkhachhang.component';

describe('DmkhachhangComponent', () => {
  let component: DmkhachhangComponent;
  let fixture: ComponentFixture<DmkhachhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkhachhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
