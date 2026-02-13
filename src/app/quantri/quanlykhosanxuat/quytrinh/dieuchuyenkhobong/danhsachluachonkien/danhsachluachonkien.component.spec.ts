import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachluachonkienComponent } from './danhsachluachonkien.component';

describe('DanhsachluachonkienComponent', () => {
  let component: DanhsachluachonkienComponent;
  let fixture: ComponentFixture<DanhsachluachonkienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachluachonkienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachluachonkienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
