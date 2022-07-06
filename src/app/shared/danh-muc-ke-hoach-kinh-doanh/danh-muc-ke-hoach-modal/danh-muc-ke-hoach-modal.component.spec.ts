import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucKeHoachModalComponent } from './danh-muc-ke-hoach-modal.component';

describe('DanhMucKeHoachModalComponent', () => {
  let component: DanhMucKeHoachModalComponent;
  let fixture: ComponentFixture<DanhMucKeHoachModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhMucKeHoachModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhMucKeHoachModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
