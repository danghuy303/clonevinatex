import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuctaisanComponent } from './danhmuctaisan.component';

describe('DanhmuctaisanComponent', () => {
  let component: DanhmuctaisanComponent;
  let fixture: ComponentFixture<DanhmuctaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
