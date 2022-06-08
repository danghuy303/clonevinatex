import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaiTienTeComponent } from './loai-tien-te.component';

describe('LoaiTienTeComponent', () => {
  let component: LoaiTienTeComponent;
  let fixture: ComponentFixture<LoaiTienTeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaiTienTeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaiTienTeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
