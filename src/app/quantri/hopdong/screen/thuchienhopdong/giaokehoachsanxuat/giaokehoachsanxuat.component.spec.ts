import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaokehoachsanxuatComponent } from './giaokehoachsanxuat.component';

describe('GiaokehoachsanxuatComponent', () => {
  let component: GiaokehoachsanxuatComponent;
  let fixture: ComponentFixture<GiaokehoachsanxuatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaokehoachsanxuatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaokehoachsanxuatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
