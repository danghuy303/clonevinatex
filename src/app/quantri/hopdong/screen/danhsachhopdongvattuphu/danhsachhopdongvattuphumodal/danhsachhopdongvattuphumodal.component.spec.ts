import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhopdongvattuphumodalComponent } from './danhsachhopdongvattuphumodal.component';

describe('DanhsachhopdongvattuphumodalComponent', () => {
  let component: DanhsachhopdongvattuphumodalComponent;
  let fixture: ComponentFixture<DanhsachhopdongvattuphumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongvattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongvattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
