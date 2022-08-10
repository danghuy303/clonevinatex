import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiGiaCuocContainerModalComponent } from './chi-phi-gia-cuoc-container-modal.component';

describe('ChiPhiGiaCuocContainerModalComponent', () => {
  let component: ChiPhiGiaCuocContainerModalComponent;
  let fixture: ComponentFixture<ChiPhiGiaCuocContainerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiGiaCuocContainerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiGiaCuocContainerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
