import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantrichatluongtoantrinhComponent } from './quantrichatluongtoantrinh.component';

describe('QuantrichatluongtoantrinhComponent', () => {
  let component: QuantrichatluongtoantrinhComponent;
  let fixture: ComponentFixture<QuantrichatluongtoantrinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantrichatluongtoantrinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantrichatluongtoantrinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
