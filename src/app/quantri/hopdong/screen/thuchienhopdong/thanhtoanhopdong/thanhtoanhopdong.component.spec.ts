import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhtoanhopdongComponent } from './thanhtoanhopdong.component';

describe('ThanhtoanhopdongComponent', () => {
  let component: ThanhtoanhopdongComponent;
  let fixture: ComponentFixture<ThanhtoanhopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhtoanhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhtoanhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
