import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhapLieuKeHoachModalComponent } from './nhap-lieu-ke-hoach-modal.component';

describe('NhapLieuKeHoachModalComponent', () => {
  let component: NhapLieuKeHoachModalComponent;
  let fixture: ComponentFixture<NhapLieuKeHoachModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhapLieuKeHoachModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhapLieuKeHoachModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
