import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkechitieuclasimattheomayComponent } from './thongkechitieuclasimattheomay.component';

describe('ThongkechitieuclasimattheomayComponent', () => {
  let component: ThongkechitieuclasimattheomayComponent;
  let fixture: ComponentFixture<ThongkechitieuclasimattheomayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkechitieuclasimattheomayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkechitieuclasimattheomayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
