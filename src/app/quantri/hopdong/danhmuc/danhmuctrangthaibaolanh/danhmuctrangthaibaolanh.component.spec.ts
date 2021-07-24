import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuctrangthaibaolanhComponent } from './danhmuctrangthaibaolanh.component';

describe('DanhmuctrangthaibaolanhComponent', () => {
  let component: DanhmuctrangthaibaolanhComponent;
  let fixture: ComponentFixture<DanhmuctrangthaibaolanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctrangthaibaolanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctrangthaibaolanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
