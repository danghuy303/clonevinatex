import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuctinhluongComponent } from './danhmuctinhluong.component';

describe('DanhmuctinhluongComponent', () => {
  let component: DanhmuctinhluongComponent;
  let fixture: ComponentFixture<DanhmuctinhluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctinhluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctinhluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
