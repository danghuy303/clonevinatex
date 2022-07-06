import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiLaiVayDaiHanComponent } from './chi-phi-lai-vay-dai-han.component';

describe('ChiPhiLaiVayDaiHanComponent', () => {
  let component: ChiPhiLaiVayDaiHanComponent;
  let fixture: ComponentFixture<ChiPhiLaiVayDaiHanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiLaiVayDaiHanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiLaiVayDaiHanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
