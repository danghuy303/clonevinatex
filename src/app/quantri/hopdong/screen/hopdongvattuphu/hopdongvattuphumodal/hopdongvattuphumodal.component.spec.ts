import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopdongvattuphumodalComponent } from './hopdongvattuphumodal.component';

describe('HopdongvattuphumodalComponent', () => {
  let component: HopdongvattuphumodalComponent;
  let fixture: ComponentFixture<HopdongvattuphumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongvattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongvattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
