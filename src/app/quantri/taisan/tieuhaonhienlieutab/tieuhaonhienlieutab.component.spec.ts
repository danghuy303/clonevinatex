import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TieuhaonhienlieutabComponent } from './tieuhaonhienlieutab.component';

describe('TieuhaonhienlieutabComponent', () => {
  let component: TieuhaonhienlieutabComponent;
  let fixture: ComponentFixture<TieuhaonhienlieutabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TieuhaonhienlieutabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TieuhaonhienlieutabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
