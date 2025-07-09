import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachhopdongmodalComponent } from './danhsachhopdongmodal.component';

describe('DanhsachhopdongmodalComponent', () => {
  let component: DanhsachhopdongmodalComponent;
  let fixture: ComponentFixture<DanhsachhopdongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachhopdongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachhopdongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
