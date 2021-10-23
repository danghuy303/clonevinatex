import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucloaibaoduongComponent } from './danhmucloaibaoduong.component';

describe('DanhmucloaibaoduongComponent', () => {
  let component: DanhmucloaibaoduongComponent;
  let fixture: ComponentFixture<DanhmucloaibaoduongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucloaibaoduongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucloaibaoduongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
