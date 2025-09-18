import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongkechitieuloicattheomayComponent } from './thongkechitieuloicattheomay.component';

describe('ThongkechitieuloicattheomayComponent', () => {
  let component: ThongkechitieuloicattheomayComponent;
  let fixture: ComponentFixture<ThongkechitieuloicattheomayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongkechitieuloicattheomayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongkechitieuloicattheomayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
