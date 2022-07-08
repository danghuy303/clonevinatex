import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiLaiVayComponent } from './chi-phi-lai-vay.component';

describe('ChiPhiLaiVayComponent', () => {
  let component: ChiPhiLaiVayComponent;
  let fixture: ComponentFixture<ChiPhiLaiVayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiLaiVayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiLaiVayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
