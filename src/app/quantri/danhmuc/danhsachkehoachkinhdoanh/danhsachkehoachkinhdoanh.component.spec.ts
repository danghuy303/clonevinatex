import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachkehoachkinhdoanhComponent } from './danhsachkehoachkinhdoanh.component';

describe('DanhsachkehoachkinhdoanhComponent', () => {
  let component: DanhsachkehoachkinhdoanhComponent;
  let fixture: ComponentFixture<DanhsachkehoachkinhdoanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachkehoachkinhdoanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachkehoachkinhdoanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
