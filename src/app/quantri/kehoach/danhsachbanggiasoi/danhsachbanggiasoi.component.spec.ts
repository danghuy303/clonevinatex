import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachbanggiasoiComponent } from './danhsachbanggiasoi.component';

describe('DanhsachbanggiasoiComponent', () => {
  let component: DanhsachbanggiasoiComponent;
  let fixture: ComponentFixture<DanhsachbanggiasoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachbanggiasoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachbanggiasoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
