import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhMucSanXuatComponent } from './dinh-muc-san-xuat.component';

describe('DinhMucSanXuatComponent', () => {
  let component: DinhMucSanXuatComponent;
  let fixture: ComponentFixture<DinhMucSanXuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhMucSanXuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhMucSanXuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
