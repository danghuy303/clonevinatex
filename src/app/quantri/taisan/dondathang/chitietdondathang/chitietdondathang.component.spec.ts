import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietdondathangComponent } from './chitietdondathang.component';

describe('ChitietdondathangComponent', () => {
  let component: ChitietdondathangComponent;
  let fixture: ComponentFixture<ChitietdondathangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietdondathangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietdondathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
