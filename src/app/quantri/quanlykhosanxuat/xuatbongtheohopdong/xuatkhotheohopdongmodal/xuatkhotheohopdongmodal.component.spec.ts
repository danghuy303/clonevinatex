import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhotheohopdongmodalComponent } from './xuatkhotheohopdongmodal.component';

describe('XuatkhotheohopdongmodalComponent', () => {
  let component: XuatkhotheohopdongmodalComponent;
  let fixture: ComponentFixture<XuatkhotheohopdongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhotheohopdongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhotheohopdongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
