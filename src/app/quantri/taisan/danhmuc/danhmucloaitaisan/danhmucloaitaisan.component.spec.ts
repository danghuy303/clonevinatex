import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucloaitaisanComponent } from './danhmucloaitaisan.component';

describe('DanhmucloaitaisanComponent', () => {
  let component: DanhmucloaitaisanComponent;
  let fixture: ComponentFixture<DanhmucloaitaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucloaitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucloaitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
