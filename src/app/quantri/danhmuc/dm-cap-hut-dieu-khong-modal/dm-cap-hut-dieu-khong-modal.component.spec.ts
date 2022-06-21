import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCapHutDieuKhongModalComponent } from './dm-cap-hut-dieu-khong-modal.component';

describe('DmCapHutDieuKhongModalComponent', () => {
  let component: DmCapHutDieuKhongModalComponent;
  let fixture: ComponentFixture<DmCapHutDieuKhongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmCapHutDieuKhongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCapHutDieuKhongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
