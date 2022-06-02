import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietthangComponent } from './chitietthang.component';

describe('ChitietthangComponent', () => {
  let component: ChitietthangComponent;
  let fixture: ComponentFixture<ChitietthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
