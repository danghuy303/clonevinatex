import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaidinhmucComponent } from './loaidinhmuc.component';

describe('LoaidinhmucComponent', () => {
  let component: LoaidinhmucComponent;
  let fixture: ComponentFixture<LoaidinhmucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaidinhmucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaidinhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
