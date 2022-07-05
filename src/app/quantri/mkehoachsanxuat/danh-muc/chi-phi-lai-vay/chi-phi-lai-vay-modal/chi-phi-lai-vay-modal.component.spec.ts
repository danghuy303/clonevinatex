import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiLaiVayModalComponent } from './chi-phi-lai-vay-modal.component';

describe('ChiPhiLaiVayModalComponent', () => {
  let component: ChiPhiLaiVayModalComponent;
  let fixture: ComponentFixture<ChiPhiLaiVayModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiLaiVayModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiLaiVayModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
