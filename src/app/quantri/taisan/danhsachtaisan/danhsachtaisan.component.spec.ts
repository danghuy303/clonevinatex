import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtaisanComponent } from './danhsachtaisan.component';

describe('DanhsachtaisanComponent', () => {
  let component: DanhsachtaisanComponent;
  let fixture: ComponentFixture<DanhsachtaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachtaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
