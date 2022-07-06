import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapLieuKeHoachComponent } from './nhap-lieu-ke-hoach.component';

describe('NhapLieuKeHoachComponent', () => {
  let component: NhapLieuKeHoachComponent;
  let fixture: ComponentFixture<NhapLieuKeHoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapLieuKeHoachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapLieuKeHoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
