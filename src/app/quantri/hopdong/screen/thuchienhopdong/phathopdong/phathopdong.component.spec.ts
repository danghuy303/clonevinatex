import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhathopdongComponent } from './phathopdong.component';

describe('PhathopdongComponent', () => {
  let component: PhathopdongComponent;
  let fixture: ComponentFixture<PhathopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhathopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhathopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
