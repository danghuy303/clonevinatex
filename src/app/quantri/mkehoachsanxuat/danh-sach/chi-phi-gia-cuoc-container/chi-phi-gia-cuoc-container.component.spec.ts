import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiGiaCuocContainerComponent } from './chi-phi-gia-cuoc-container.component';

describe('ChiPhiGiaCuocContainerComponent', () => {
  let component: ChiPhiGiaCuocContainerComponent;
  let fixture: ComponentFixture<ChiPhiGiaCuocContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiGiaCuocContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiGiaCuocContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
