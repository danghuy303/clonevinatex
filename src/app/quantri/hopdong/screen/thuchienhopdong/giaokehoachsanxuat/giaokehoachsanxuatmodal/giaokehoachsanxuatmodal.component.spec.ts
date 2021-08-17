import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiaokehoachsanxuatmodalComponent } from './giaokehoachsanxuatmodal.component';

describe('GiaokehoachsanxuatmodalComponent', () => {
  let component: GiaokehoachsanxuatmodalComponent;
  let fixture: ComponentFixture<GiaokehoachsanxuatmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiaokehoachsanxuatmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiaokehoachsanxuatmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
