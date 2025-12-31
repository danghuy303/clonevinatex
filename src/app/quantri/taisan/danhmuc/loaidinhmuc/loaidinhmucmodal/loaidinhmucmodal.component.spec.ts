import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaidinhmucmodalComponent } from './loaidinhmucmodal.component';

describe('LoaidinhmucmodalComponent', () => {
  let component: LoaidinhmucmodalComponent;
  let fixture: ComponentFixture<LoaidinhmucmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaidinhmucmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaidinhmucmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
