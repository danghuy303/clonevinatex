import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemtrabanchephammodalComponent } from './kiemtrabanchephammodal.component';

describe('KiemtrabanchephammodalComponent', () => {
  let component: KiemtrabanchephammodalComponent;
  let fixture: ComponentFixture<KiemtrabanchephammodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemtrabanchephammodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemtrabanchephammodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
