import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietdanhsachhanghoaComponent } from './chitietdanhsachhanghoa.component';

describe('ChitietdanhsachhanghoaComponent', () => {
  let component: ChitietdanhsachhanghoaComponent;
  let fixture: ComponentFixture<ChitietdanhsachhanghoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietdanhsachhanghoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietdanhsachhanghoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
