import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuctaisanmodalComponent } from './danhmuctaisanmodal.component';

describe('DanhmuctaisanmodalComponent', () => {
  let component: DanhmuctaisanmodalComponent;
  let fixture: ComponentFixture<DanhmuctaisanmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctaisanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctaisanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
