import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieuhaonhienlieumodalComponent } from './tieuhaonhienlieumodal.component';

describe('TieuhaonhienlieumodalComponent', () => {
  let component: TieuhaonhienlieumodalComponent;
  let fixture: ComponentFixture<TieuhaonhienlieumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuhaonhienlieumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuhaonhienlieumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
