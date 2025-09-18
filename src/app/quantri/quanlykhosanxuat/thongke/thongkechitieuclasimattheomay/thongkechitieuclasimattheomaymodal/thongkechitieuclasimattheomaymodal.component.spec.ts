import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkechitieuclasimattheomaymodalComponent } from './thongkechitieuclasimattheomaymodal.component';

describe('ThongkechitieuclasimattheomaymodalComponent', () => {
  let component: ThongkechitieuclasimattheomaymodalComponent;
  let fixture: ComponentFixture<ThongkechitieuclasimattheomaymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkechitieuclasimattheomaymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkechitieuclasimattheomaymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
