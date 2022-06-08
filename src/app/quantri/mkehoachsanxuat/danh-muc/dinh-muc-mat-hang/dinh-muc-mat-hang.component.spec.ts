import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhMucMatHangComponent } from './dinh-muc-mat-hang.component';

describe('DinhMucMatHangComponent', () => {
  let component: DinhMucMatHangComponent;
  let fixture: ComponentFixture<DinhMucMatHangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhMucMatHangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhMucMatHangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
