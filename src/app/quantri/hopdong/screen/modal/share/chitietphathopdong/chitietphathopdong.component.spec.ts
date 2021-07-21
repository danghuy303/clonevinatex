import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietphathopdongComponent } from './chitietphathopdong.component';

describe('ChitietphathopdongComponent', () => {
  let component: ChitietphathopdongComponent;
  let fixture: ComponentFixture<ChitietphathopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietphathopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietphathopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
