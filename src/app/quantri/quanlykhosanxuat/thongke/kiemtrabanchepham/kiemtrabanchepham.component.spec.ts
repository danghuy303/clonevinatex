import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemtrabanchephamComponent } from './kiemtrabanchepham.component';

describe('KiemtrabanchephamComponent', () => {
  let component: KiemtrabanchephamComponent;
  let fixture: ComponentFixture<KiemtrabanchephamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemtrabanchephamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemtrabanchephamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
