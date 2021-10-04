import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhopdongvattuphuComponent } from './danhsachhopdongvattuphu.component';

describe('DanhsachhopdongvattuphuComponent', () => {
  let component: DanhsachhopdongvattuphuComponent;
  let fixture: ComponentFixture<DanhsachhopdongvattuphuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongvattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongvattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
