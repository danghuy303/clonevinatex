import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucphibanhangComponent } from './danhmucphibanhang.component';

describe('DanhmucphibanhangComponent', () => {
  let component: DanhmucphibanhangComponent;
  let fixture: ComponentFixture<DanhmucphibanhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucphibanhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucphibanhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
