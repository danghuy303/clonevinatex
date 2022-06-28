import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiDienModalComponent } from './chi-phi-dien-modal.component';

describe('ChiPhiDienModalComponent', () => {
  let component: ChiPhiDienModalComponent;
  let fixture: ComponentFixture<ChiPhiDienModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiDienModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiDienModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
