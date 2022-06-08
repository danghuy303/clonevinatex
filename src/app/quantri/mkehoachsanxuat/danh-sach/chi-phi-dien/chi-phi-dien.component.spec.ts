import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiDienComponent } from './chi-phi-dien.component';

describe('ChiPhiDienComponent', () => {
  let component: ChiPhiDienComponent;
  let fixture: ComponentFixture<ChiPhiDienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiDienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiDienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
