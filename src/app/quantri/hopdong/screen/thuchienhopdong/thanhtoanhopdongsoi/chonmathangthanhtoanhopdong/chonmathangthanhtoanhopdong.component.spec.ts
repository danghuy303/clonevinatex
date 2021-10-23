import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonmathangthanhtoanhopdongComponent } from './chonmathangthanhtoanhopdong.component';

describe('ChonmathangthanhtoanhopdongComponent', () => {
  let component: ChonmathangthanhtoanhopdongComponent;
  let fixture: ComponentFixture<ChonmathangthanhtoanhopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonmathangthanhtoanhopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonmathangthanhtoanhopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
