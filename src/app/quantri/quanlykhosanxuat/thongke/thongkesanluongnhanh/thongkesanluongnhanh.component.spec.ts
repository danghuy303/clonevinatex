import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkesanluongnhanhComponent } from './thongkesanluongnhanh.component';

describe('ThongkesanluongnhanhComponent', () => {
  let component: ThongkesanluongnhanhComponent;
  let fixture: ComponentFixture<ThongkesanluongnhanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkesanluongnhanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkesanluongnhanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
