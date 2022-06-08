import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiHopDongComponent } from './loai-hop-dong.component';

describe('LoaiHopDongComponent', () => {
  let component: LoaiHopDongComponent;
  let fixture: ComponentFixture<LoaiHopDongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiHopDongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiHopDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
