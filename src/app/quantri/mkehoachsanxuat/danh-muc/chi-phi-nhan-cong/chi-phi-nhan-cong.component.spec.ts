import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiNhanCongComponent } from './chi-phi-nhan-cong.component';

describe('ChiPhiNhanCongComponent', () => {
  let component: ChiPhiNhanCongComponent;
  let fixture: ComponentFixture<ChiPhiNhanCongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiNhanCongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiNhanCongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
