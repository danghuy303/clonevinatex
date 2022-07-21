import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkesanluongnhanhmodalComponent } from './thongkesanluongnhanhmodal.component';

describe('ThongkesanluongnhanhmodalComponent', () => {
  let component: ThongkesanluongnhanhmodalComponent;
  let fixture: ComponentFixture<ThongkesanluongnhanhmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkesanluongnhanhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkesanluongnhanhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
