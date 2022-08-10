import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuocXuatKhauComponentComponent } from './nuoc-xuat-khau-component.component';

describe('NuocXuatKhauComponentComponent', () => {
  let component: NuocXuatKhauComponentComponent;
  let fixture: ComponentFixture<NuocXuatKhauComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuocXuatKhauComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuocXuatKhauComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
