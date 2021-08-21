import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhothanhphamhopdongComponent } from './xuatkhothanhphamhopdong.component';

describe('XuatkhothanhphamhopdongComponent', () => {
  let component: XuatkhothanhphamhopdongComponent;
  let fixture: ComponentFixture<XuatkhothanhphamhopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhothanhphamhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhothanhphamhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
