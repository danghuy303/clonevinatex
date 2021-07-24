import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmuctrangthaibaolanhComponent } from './modaldanhmuctrangthaibaolanh.component';

describe('ModaldanhmuctrangthaibaolanhComponent', () => {
  let component: ModaldanhmuctrangthaibaolanhComponent;
  let fixture: ComponentFixture<ModaldanhmuctrangthaibaolanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuctrangthaibaolanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuctrangthaibaolanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
