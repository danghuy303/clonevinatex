import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachtailieuComponent } from './danhsachtailieu.component';

describe('DanhsachtailieuComponent', () => {
  let component: DanhsachtailieuComponent;
  let fixture: ComponentFixture<DanhsachtailieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachtailieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachtailieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
