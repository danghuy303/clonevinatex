import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiahanhopdongComponent } from './giahanhopdong.component';

describe('GiahanhopdongComponent', () => {
  let component: GiahanhopdongComponent;
  let fixture: ComponentFixture<GiahanhopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiahanhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiahanhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
