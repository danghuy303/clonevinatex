import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietdieukhoanthanhtoanComponent } from './chitietdieukhoanthanhtoan.component';

describe('ChitietdieukhoanthanhtoanComponent', () => {
  let component: ChitietdieukhoanthanhtoanComponent;
  let fixture: ComponentFixture<ChitietdieukhoanthanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietdieukhoanthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietdieukhoanthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
