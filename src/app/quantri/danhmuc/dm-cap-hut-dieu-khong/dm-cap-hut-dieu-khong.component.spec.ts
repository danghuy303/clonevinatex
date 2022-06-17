import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmCapHutDieuKhongComponent } from './dm-cap-hut-dieu-khong.component';

describe('DmCapHutDieuKhongComponent', () => {
  let component: DmCapHutDieuKhongComponent;
  let fixture: ComponentFixture<DmCapHutDieuKhongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmCapHutDieuKhongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmCapHutDieuKhongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
