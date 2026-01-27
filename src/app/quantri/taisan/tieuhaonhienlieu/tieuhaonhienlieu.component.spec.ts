import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieuhaonhienlieuComponent } from './tieuhaonhienlieu.component';

describe('TieuhaonhienlieuComponent', () => {
  let component: TieuhaonhienlieuComponent;
  let fixture: ComponentFixture<TieuhaonhienlieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuhaonhienlieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuhaonhienlieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
