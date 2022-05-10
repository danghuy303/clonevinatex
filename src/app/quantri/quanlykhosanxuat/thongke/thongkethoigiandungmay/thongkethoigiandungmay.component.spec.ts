import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkethoigiandungmayComponent } from './thongkethoigiandungmay.component';

describe('ThongkethoigiandungmayComponent', () => {
  let component: ThongkethoigiandungmayComponent;
  let fixture: ComponentFixture<ThongkethoigiandungmayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkethoigiandungmayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkethoigiandungmayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
