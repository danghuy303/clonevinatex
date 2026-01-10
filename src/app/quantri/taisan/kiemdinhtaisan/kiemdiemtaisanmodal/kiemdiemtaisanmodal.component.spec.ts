import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemdiemtaisanmodalComponent } from './kiemdiemtaisanmodal.component';

describe('KiemdiemtaisanmodalComponent', () => {
  let component: KiemdiemtaisanmodalComponent;
  let fixture: ComponentFixture<KiemdiemtaisanmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemdiemtaisanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemdiemtaisanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
