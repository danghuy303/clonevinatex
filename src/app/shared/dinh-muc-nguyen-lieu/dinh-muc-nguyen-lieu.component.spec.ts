import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhMucNguyenLieuComponent } from './dinh-muc-nguyen-lieu.component';

describe('DinhMucNguyenLieuComponent', () => {
  let component: DinhMucNguyenLieuComponent;
  let fixture: ComponentFixture<DinhMucNguyenLieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhMucNguyenLieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhMucNguyenLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
