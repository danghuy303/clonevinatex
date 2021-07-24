import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucloaihopdongComponent } from './danhmucloaihopdong.component';

describe('DanhmucloaihopdongComponent', () => {
  let component: DanhmucloaihopdongComponent;
  let fixture: ComponentFixture<DanhmucloaihopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucloaihopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucloaihopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
